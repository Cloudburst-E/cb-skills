const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const vscode = require('vscode')

/** Activate extension */
function activate(context) {
  const disposable = vscode.commands.registerCommand('developerConsole.open', () => {
    const panel = vscode.window.createWebviewPanel(
      'developerConsole',
      'Developer Console',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      },
    )

    panel.webview.html = getWebviewContent()

    const postInitial = () => {
      panel.webview.postMessage({
        command: 'initialData',
        payload: collectInitialPayload(),
      })
    }

    postInitial()

    panel.webview.onDidReceiveMessage(async (msg) => {
      if (msg.command === 'searchGitHub') {
        const github = require('./connectors/github')
        const results = await github.searchPRs(msg.query, null)
        panel.webview.postMessage({ command: 'githubResults', results })
        return
      }

      if (msg.command === 'searchClickUp') {
        const clickup = require('./connectors/clickup')
        const results = await clickup.searchTasks(msg.query, null)
        panel.webview.postMessage({ command: 'clickupResults', results })
        return
      }

      if (msg.command === 'requestInitialData') {
        postInitial()
        return
      }

      if (msg.command === 'refreshCrewRuns') {
        panel.webview.postMessage({ command: 'crewRuns', payload: readCrewRuns() })
        return
      }

      if (msg.command === 'runCbCrew') {
        runCbCrew()
        return
      }

      if (msg.command === 'selectRuntime') {
        vscode.commands.executeCommand('setContext', 'cbDeveloperConsole.runtime', msg.runtimeId)
        return
      }

      if (msg.command === 'openMigrationDoc') {
        openMigrationDoc()
      }
    })
  })

  context.subscriptions.push(disposable)
}

function deactivate() {}

function collectInitialPayload() {
  return {
    runtimes: getRuntimeConfigs(),
    context: getContextSnapshot(),
    crewRuns: readCrewRuns(),
  }
}

function getRuntimeConfigs() {
  const skillsFolder = findWorkspaceFolder('cb-skills')
  const crewFolder = findWorkspaceFolder('cb-crew')
  const runtimes = [
    {
      id: 'cb-agent',
      label: 'CB Agent (Skills)',
      description:
        'Legacy orchestrator that loads the cb-agent skill bundle via pnpx skills (Copilot chat).',
      instructions: [
        'Start a new VS Code chat session and load the cb-agent, product, engineering, and ops skills.',
        'Use this developer console to pull PRs, ClickUp tasks, and QA notes while cb-agent runs.',
        skillsFolder
          ? `Skills repo detected at ${skillsFolder.uri.fsPath}`
          : 'cb-skills repo not detected in workspace.',
      ],
    },
  ]

  if (crewFolder) {
    runtimes.push({
      id: 'cb-crew',
      label: 'CB Crew (CrewAI)',
      description: 'CrewAI runtime powered by the cb-crew repo and uv-managed environment.',
      instructions: [
        'Ensure uv dependencies are synced (run "uv sync" inside cb-crew once).',
        'Run "uv run python -m crews.cloudburst" to execute the orchestrator.',
        'Review JSON + tool logs under cb-crew/.crewlogs/.',
      ],
      runCommand: 'uv run python -m crews.cloudburst',
      repoPath: crewFolder.uri.fsPath,
      logsPath: path.join(crewFolder.uri.fsPath, '.crewlogs'),
    })
  }
  else {
    runtimes.push({
      id: 'cb-crew',
      label: 'CB Crew (CrewAI)',
      description:
        'CrewAI runtime unavailable until the cb-crew repo is added to this workspace.',
      instructions: ['Clone Cloudburst-E/cb-crew next to cb-skills to enable this runtime.'],
    })
  }

  return runtimes
}

function getContextSnapshot() {
  const folders = vscode.workspace.workspaceFolders || []
  return folders.map(folder => ({
    name: folder.name,
    path: folder.uri.fsPath,
    branch: getGitBranch(folder.uri.fsPath),
  }))
}

function getGitBranch(cwd) {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  }
  catch {
    return 'unknown'
  }
}

function readCrewRuns() {
  const crewFolder = findWorkspaceFolder('cb-crew')
  if (!crewFolder) {
    return { runs: [], toolEvents: [], logsPath: null }
  }

  const logDir = path.join(crewFolder.uri.fsPath, '.crewlogs')
  if (!fs.existsSync(logDir)) {
    return { runs: [], toolEvents: [], logsPath: logDir }
  }

  const files = fs
    .readdirSync(logDir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({ file, fullPath: path.join(logDir, file) }))
    .sort((a, b) => fs.statSync(b.fullPath).mtimeMs - fs.statSync(a.fullPath).mtimeMs)
    .slice(0, 10)

  const runs = files.map(({ file, fullPath }) => {
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
      return {
        id: data.id || file,
        status: data.status || 'unknown',
        summary: data.summary || data.goal || 'Crew run',
        startedAt: data.started_at || data.startedAt || null,
        file: fullPath,
      }
    }
    catch {
      return {
        id: file,
        status: 'error',
        summary: 'Unable to parse run file',
        file: fullPath,
      }
    }
  })

  return {
    runs,
    toolEvents: tailLog(path.join(logDir, 'tools.log'), 12),
    logsPath: logDir,
  }
}

function tailLog(filePath, maxLines) {
  if (!fs.existsSync(filePath)) {
    return []
  }
  const lines = fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
  return lines.slice(-maxLines)
}

function findWorkspaceFolder(targetName) {
  const folders = vscode.workspace.workspaceFolders || []
  return folders.find(
    folder =>
      folder.name === targetName || folder.uri.fsPath.endsWith(path.sep + targetName),
  )
}

function runCbCrew() {
  const crewFolder = findWorkspaceFolder('cb-crew')
  if (!crewFolder) {
    vscode.window.showErrorMessage('cb-crew workspace folder not detected.')
    return
  }

  const terminal = vscode.window.createTerminal({
    name: 'CB Crew Runtime',
    cwd: crewFolder.uri.fsPath,
  })
  terminal.show(true)
  terminal.sendText('uv run python -m crews.cloudburst')
}

function openMigrationDoc() {
  const skillsFolder = findWorkspaceFolder('cb-skills')
  if (!skillsFolder) {
    vscode.window.showErrorMessage('cb-skills workspace folder not detected.')
    return
  }

  const docPath = path.join(skillsFolder.uri.fsPath, 'docs', 'cb-crew-migration.md')
  vscode.workspace.openTextDocument(docPath).then((doc) => {
    vscode.window.showTextDocument(doc, { preview: false })
  })
}

function getWebviewContent() {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Developer Console</title>
      <style>
        :root {
          color-scheme: light dark;
        }
        body {
          font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
            'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 16px;
          background: var(--vscode-editor-background, #111);
          color: var(--vscode-editor-foreground, #111);
        }
        h2 {
          margin-top: 0;
        }
        .layout {
          display: grid;
          gap: 16px;
        }
        .card {
          background: var(--vscode-sideBar-background, #1d1d1f);
          border: 1px solid var(--vscode-sideBar-border, #2d2d31);
          border-radius: 12px;
          padding: 16px;
        }
        .card h4 {
          margin-top: 0;
        }
        .card + .card {
          margin-top: 0;
        }
        .runtime-grid {
          display: grid;
          gap: 16px;
        }
        .runtime-actions {
          margin-top: 12px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        select,
        input {
          width: 100%;
          box-sizing: border-box;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--vscode-input-border, #3a3a3e);
          background: var(--vscode-input-background, #26262b);
          color: inherit;
        }
        button {
          border-radius: 8px;
          border: 1px solid var(--vscode-button-border, transparent);
          padding: 8px 12px;
          background: var(--vscode-button-background, #0078d4);
          color: var(--vscode-button-foreground, #fff);
          cursor: pointer;
        }
        button.secondary {
          background: transparent;
          border-color: var(--vscode-button-border, #3a3a3e);
        }
        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 999px;
          border: 1px solid var(--vscode-tab-activeBorder, #3a3a3e);
          font-size: 12px;
        }
        .context-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--vscode-sideBar-border, #2a2a2e);
          padding: 8px 0;
          gap: 12px;
        }
        .context-row:last-child {
          border-bottom: none;
        }
        .muted {
          opacity: 0.7;
        }
        .runs-list {
          max-height: 220px;
          overflow-y: auto;
          border: 1px solid var(--vscode-sideBar-border, #2a2a2e);
          border-radius: 8px;
        }
        .run-item {
          padding: 10px 12px;
          border-bottom: 1px solid var(--vscode-sideBar-border, #2a2a2e);
        }
        .run-item:last-child {
          border-bottom: none;
        }
        pre {
          background: var(--vscode-input-background, #1f1f23);
          padding: 8px;
          border-radius: 8px;
          overflow-x: auto;
        }
        .search-grid {
          display: grid;
          gap: 12px;
          margin-top: 12px;
        }
        .result-item {
          padding: 8px 0;
          border-bottom: 1px solid var(--vscode-sideBar-border, #2a2a2e);
        }
        a {
          color: var(--vscode-textLink-foreground, #4aa3ff);
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h2>Cloudburst Developer Console</h2>
      <p class="muted">Runtime orchestration, artifact search, and Crew telemetry in one panel.</p>

      <div class="layout">
        <section class="card">
          <h4>Runtime Selector</h4>
          <select id="runtimeSelect"></select>
          <div id="runtimeDetails" class="runtime-grid"></div>
          <div class="runtime-actions">
            <button id="runCrewBtn" style="display:none">Run CB Crew</button>
            <button id="openBlueprintBtn" class="secondary">Open Migration Blueprint</button>
          </div>
        </section>

        <section class="card">
          <div class="heading">
            <h4>Workspace Context</h4>
          </div>
          <div id="contextList" class="search-grid"></div>
        </section>

        <section class="card">
          <div class="heading" style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <h4>CB Crew Runs</h4>
            <button id="refreshRunsBtn" class="secondary">Refresh</button>
          </div>
          <div class="muted" id="logsPath"></div>
          <div class="runs-list" id="crewRuns"></div>
          <h5>Tool Events</h5>
          <div class="runs-list" id="toolEvents"></div>
        </section>

        <section class="card">
          <h4>Search GitHub & ClickUp</h4>
          <div class="search-grid">
            <input id="q" placeholder="Search PRs/issues or ClickUp tasks" />
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button id="g">Search GitHub</button>
              <button id="c" class="secondary">Search ClickUp (mock)</button>
            </div>
          </div>
          <div class="box">
            <h5>GitHub Results</h5>
            <div id="gh"></div>
          </div>
          <div class="box">
            <h5>ClickUp Results</h5>
            <div id="cu"></div>
          </div>
        </section>
      </div>

      <script>
        const vscode = acquireVsCodeApi()
        const state = {
          runtimes: [],
          selectedRuntime: null,
          context: [],
          crewRuns: { runs: [], toolEvents: [], logsPath: null },
        }

        const runtimeSelect = document.getElementById('runtimeSelect')
        const runtimeDetails = document.getElementById('runtimeDetails')
        const runCrewBtn = document.getElementById('runCrewBtn')
        const openBlueprintBtn = document.getElementById('openBlueprintBtn')
        const refreshRunsBtn = document.getElementById('refreshRunsBtn')
        const crewRunsContainer = document.getElementById('crewRuns')
        const toolEventsContainer = document.getElementById('toolEvents')
        const contextList = document.getElementById('contextList')
        const logsPathEl = document.getElementById('logsPath')

        vscode.postMessage({ command: 'requestInitialData' })

        runtimeSelect.addEventListener('change', (event) => {
          state.selectedRuntime = event.target.value
          vscode.postMessage({ command: 'selectRuntime', runtimeId: state.selectedRuntime })
          renderRuntimeDetails()
        })

        runCrewBtn.addEventListener('click', () => {
          vscode.postMessage({ command: 'runCbCrew' })
        })

        openBlueprintBtn.addEventListener('click', () => {
          vscode.postMessage({ command: 'openMigrationDoc' })
        })

        refreshRunsBtn.addEventListener('click', () => {
          vscode.postMessage({ command: 'refreshCrewRuns' })
        })

        document.getElementById('g').addEventListener('click', () => {
          const q = document.getElementById('q').value
          vscode.postMessage({ command: 'searchGitHub', query: q })
        })
        document.getElementById('c').addEventListener('click', () => {
          const q = document.getElementById('q').value
          vscode.postMessage({ command: 'searchClickUp', query: q })
        })

        window.addEventListener('message', (event) => {
          const msg = event.data
          if (msg.command === 'initialData') {
            state.runtimes = msg.payload.runtimes || []
            state.context = msg.payload.context || []
            state.crewRuns = msg.payload.crewRuns || { runs: [], toolEvents: [], logsPath: null }
            state.selectedRuntime = state.selectedRuntime || (state.runtimes[0] && state.runtimes[0].id)
            renderRuntimeOptions()
            renderContext()
            renderCrewRuns()
            return
          }

          if (msg.command === 'crewRuns') {
            state.crewRuns = msg.payload || { runs: [], toolEvents: [], logsPath: null }
            renderCrewRuns()
            return
          }

          if (msg.command === 'githubResults') {
            const gh = document.getElementById('gh')
            gh.innerHTML = ''
            for (const it of msg.results) {
              const d = document.createElement('div')
              d.className = 'result-item'
              const safeTitle = escapeHtml(it.title || 'Untitled PR')
              const safeUrl = escapeAttribute(it.url || '#')
              d.innerHTML = \`<strong>\${safeTitle}</strong> - <a href="\${safeUrl}" target="_blank">open</a>\`
              gh.appendChild(d)
            }
            return
          }

          if (msg.command === 'clickupResults') {
            const cu = document.getElementById('cu')
            cu.innerHTML = ''
            for (const it of msg.results) {
              const d = document.createElement('div')
              d.className = 'result-item'
              d.innerText = \`\${it.id} - \${it.name}\`
              cu.appendChild(d)
            }
          }
        })

        function renderRuntimeOptions() {
          runtimeSelect.innerHTML = state.runtimes
            .map((runtime) => \`<option value="\${escapeAttribute(runtime.id)}">\${escapeHtml(runtime.label)}</option>\`)
            .join('')
          if (state.selectedRuntime) {
            runtimeSelect.value = state.selectedRuntime
          }
          renderRuntimeDetails()
        }

        function renderRuntimeDetails() {
          const runtime = state.runtimes.find((r) => r.id === state.selectedRuntime)
          if (!runtime) {
            runtimeDetails.innerHTML = '<p class="muted">Select a runtime to view details.</p>'
            runCrewBtn.style.display = 'none'
            return
          }

          const instructions = (runtime.instructions || [])
            .map((line) => \`<li>\${escapeHtml(line)}</li>\`)
            .join('')
          const commandBlock = runtime.runCommand
            ? \`<label>Command</label><pre>\${escapeHtml(runtime.runCommand)}</pre>\`
            : ''
          const repo = runtime.repoPath
            ? \`<p class="muted">Repo: \${escapeHtml(runtime.repoPath)}</p>\`
            : ''
          const logs = runtime.logsPath
            ? \`<p class="muted">Logs: \${escapeHtml(runtime.logsPath)}</p>\`
            : ''
          runtimeDetails.innerHTML = \`
            <p>\${escapeHtml(runtime.description)}</p>
            <ul>\${instructions}</ul>
            \${commandBlock}
            \${repo}
            \${logs}
          \`

          runCrewBtn.style.display = runtime.id === 'cb-crew' && runtime.repoPath ? 'inline-flex' : 'none'
        }

        function renderContext() {
          if (!state.context.length) {
            contextList.innerHTML = '<p class="muted">No workspace folders detected.</p>'
            return
          }
          contextList.innerHTML = state.context
            .map(
              (ctx) => \`
                <div class="context-row">
                  <div>
                    <strong>\${escapeHtml(ctx.name)}</strong>
                    <div class="muted">\${escapeHtml(ctx.path)}</div>
                  </div>
                  <span class="pill">\${escapeHtml(ctx.branch)}</span>
                </div>
              \`,
            )
            .join('')
        }

        function renderCrewRuns() {
          logsPathEl.textContent = state.crewRuns.logsPath ? \`Logs: \${state.crewRuns.logsPath}\` : 'Logs folder not detected.'
          if (!state.crewRuns.runs.length) {
            crewRunsContainer.innerHTML = '<div class="run-item muted">No Crew runs recorded yet.</div>'
          } else {
            crewRunsContainer.innerHTML = state.crewRuns.runs
              .map(
                (run) => \`
                  <div class="run-item">
                    <strong>\${escapeHtml(run.summary)}</strong>
                    <div class="muted">Status: \${escapeHtml(run.status)}\${run.startedAt ? \` - Started: \${escapeHtml(run.startedAt)}\` : ''}</div>
                  </div>
                \`,
              )
              .join('')
          }

          if (!state.crewRuns.toolEvents.length) {
            toolEventsContainer.innerHTML = '<div class="run-item muted">No tool events logged.</div>'
          } else {
            toolEventsContainer.innerHTML = state.crewRuns.toolEvents
              .map((eventLine) => \`<div class="run-item">\${escapeHtml(eventLine)}</div>\`)
              .join('')
          }
        }

        function escapeHtml(value) {
          return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function escapeAttribute(value) {
          return escapeHtml(value).replace(/\`/g, '&#96;')
        }
      </script>
    </body>
  </html>`
}

module.exports = { activate, deactivate }
