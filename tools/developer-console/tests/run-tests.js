const assert = require('node:assert')
const http = require('node:http')
const process = require('node:process')
const clickup = require('../connectors/clickup')
const github = require('../connectors/github')

async function run() {
  process.stdout.write('Starting local mock servers for tests...\n')

  // GitHub mock server
  const ghServer = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/search/issues') {
      const _q = url.searchParams.get('q')
      const body = JSON.stringify({ items: [{ number: 99, title: `mock PR matching ${_q}`, html_url: 'http://example/pull/99', user: { login: 'bob' }, state: 'open' }] })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(body)
    }
    else {
      res.writeHead(404)
      res.end()
    }
  })

  // ClickUp mock server
  const cuServer = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/tasks') {
      const _q = url.searchParams.get('search')
      const body = JSON.stringify({ tasks: [{ id: 'T-99', name: `task ${_q}` }] })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(body)
    }
    else {
      res.writeHead(404)
      res.end()
    }
  })

  await new Promise(r => ghServer.listen(0, r))
  await new Promise(r => cuServer.listen(0, r))
  const ghPort = ghServer.address().port
  const cuPort = cuServer.address().port
  const ghUrl = `http://localhost:${ghPort}`
  const cuUrl = `http://localhost:${cuPort}`

  try {
    process.stdout.write(`Running GitHub connector test against ${ghUrl}\n`)
    const ghRes = await github.searchPRs('test', 'fake-token', ghUrl)
    assert(Array.isArray(ghRes), 'github result should be array')
    assert(ghRes.length === 1, 'expected one result')
    assert(ghRes[0].id === 99)
    process.stdout.write('GitHub connector test passed\n')

    process.stdout.write(`Running ClickUp connector test against ${cuUrl}\n`)
    const cuRes = await clickup.searchTasks('alpha', null, cuUrl)
    assert(Array.isArray(cuRes), 'clickup result should be array')
    assert(cuRes[0].name === 'task alpha')
    process.stdout.write('ClickUp connector test passed\n')
  }
  finally {
    ghServer.close()
    cuServer.close()
  }

  process.stdout.write('All tests passed\n')
}

run().catch((err) => {
  console.error('Tests failed:', err)
  process.exitCode = 1
})
