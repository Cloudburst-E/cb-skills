const http = require('http')
const assert = require('assert')
const github = require('../connectors/github')
const clickup = require('../connectors/clickup')

async function run() {
  console.log('Starting local mock servers for tests...')

  // GitHub mock server
  const ghServer = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/search/issues') {
      const q = url.searchParams.get('q')
      const body = JSON.stringify({ items: [{ number: 99, title: 'mock PR', html_url: 'http://example/pull/99', user: { login: 'bob' }, state: 'open' }] })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(body)
    } else {
      res.writeHead(404)
      res.end()
    }
  })

  // ClickUp mock server
  const cuServer = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/tasks') {
      const q = url.searchParams.get('search')
      const body = JSON.stringify({ tasks: [{ id: 'T-99', name: `task ${q}` }] })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(body)
    } else {
      res.writeHead(404)
      res.end()
    }
  })

  await new Promise((r) => ghServer.listen(0, r))
  await new Promise((r) => cuServer.listen(0, r))
  const ghPort = ghServer.address().port
  const cuPort = cuServer.address().port
  const ghUrl = `http://localhost:${ghPort}`
  const cuUrl = `http://localhost:${cuPort}`

  try {
    console.log('Running GitHub connector test against', ghUrl)
    const ghRes = await github.searchPRs('test', 'fake-token', ghUrl)
    assert(Array.isArray(ghRes), 'github result should be array')
    assert(ghRes.length === 1, 'expected one result')
    assert(ghRes[0].id === 99)
    console.log('GitHub connector test passed')

    console.log('Running ClickUp connector test against', cuUrl)
    const cuRes = await clickup.searchTasks('alpha', null, cuUrl)
    assert(Array.isArray(cuRes), 'clickup result should be array')
    assert(cuRes[0].name === 'task alpha')
    console.log('ClickUp connector test passed')
  } finally {
    ghServer.close()
    cuServer.close()
  }

  console.log('All tests passed')
}

run().catch((err) => {
  console.error('Tests failed:', err)
  process.exitCode = 1
})
