/* eslint-disable no-template-curly-in-string */
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

    panel.webview.onDidReceiveMessage(async (msg) => {
      if (msg.command === 'searchGitHub') {
        // Use connector stub
        const github = require('./connectors/github')
        const results = await github.searchPRs(msg.query, null)
        panel.webview.postMessage({ command: 'githubResults', results })
      }
      if (msg.command === 'searchClickUp') {
        const clickup = require('./connectors/clickup')
        const results = await clickup.searchTasks(msg.query, null)
        panel.webview.postMessage({ command: 'clickupResults', results })
      }
    })
  })

  context.subscriptions.push(disposable)
}

function deactivate() {}

function getWebviewContent() {
  const html = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '  <title>Developer Console</title>',
    '  <style>',
    '    body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial; margin:12px}',
    '    input{width:60%; padding:6px}',
    '    button{margin-left:8px}',
    '    .box{margin-top:12px}',
    '    .item{padding:6px;border-bottom:1px solid #eee}',
    '  </style>',
    '</head>',
    '<body>',
    '  <h3>Developer Console (Prototype)</h3>',
    '  <div>',
    '    <input id="q" placeholder="Search PRs/issues..." />',
    '    <button id="g">Search GitHub</button>',
    '    <button id="c">Search ClickUp (stub)</button>',
    '  </div>',
    '  <div class="box">',
    '    <h4>GitHub Results</h4>',
    '    <div id="gh"></div>',
    '  </div>',
    '  <div class="box">',
    '    <h4>ClickUp Results</h4>',
    '    <div id="cu"></div>',
    '  </div>',
    '  <script>',
    '    const vscode = acquireVsCodeApi();',
    '    document.getElementById(\'g\').addEventListener(\'click\', ()=>{',
    '      const q = document.getElementById(\'q\').value;',
    '      vscode.postMessage({ command: \'searchGitHub\', query: q });',
    '    });',
    '    document.getElementById(\'c\').addEventListener(\'click\', ()=>{',
    '      const q = document.getElementById(\'q\').value;',
    '      vscode.postMessage({ command: \'searchClickUp\', query: q });',
    '    });',
    '    window.addEventListener(\'message\', event => {',
    '      const msg = event.data;',
    '      if (msg.command === \'githubResults\') {',
    '        const gh = document.getElementById(\'gh\')',
    '        gh.innerHTML = \'\'',
    '        for (const it of msg.results) {',
    '          const d = document.createElement(\'div\')',
    '          d.className = \'item\'',
    '          d.innerHTML = `<strong>${it.title}</strong> — <a href="${it.url}" target="_blank">open</a>`',
    '          gh.appendChild(d)',
    '        }',
    '      }',
    '      if (msg.command === \'clickupResults\') {',
    '        const cu = document.getElementById(\'cu\')',
    '        cu.innerHTML = \'\'',
    '        for (const it of msg.results) {',
    '          const d = document.createElement(\'div\')',
    '          d.className = \'item\'',
    '          d.innerText = `${it.id} — ${it.name}`',
    '          cu.appendChild(d)',
    '        }',
    '      }',
    '    })',
    '  </script>',
    '</body>',
    '</html>',
  ].join('\n')

  return html
}

module.exports = { activate, deactivate }
