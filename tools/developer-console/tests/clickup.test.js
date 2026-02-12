const { describe, it, expect, beforeAll, afterAll } = require('vitest')
const http = require('http')
const clickup = require('../connectors/clickup')

let server
let url

beforeAll(() => {
  server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, 'http://localhost')
    if (urlObj.pathname === '/tasks') {
      const q = urlObj.searchParams.get('search')
      const body = JSON.stringify({ tasks: [{ id: 'T-1', name: `mock task ${q}` }] })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(body)
    } else {
      res.writeHead(404)
      res.end()
    }
  })
  server.listen(0)
  const port = server.address().port
  url = `http://localhost:${port}`
})

afterAll(() => {
  server.close()
})

describe('clickup connector', () => {
  it('calls mock server when baseUrl provided', async () => {
    const results = await clickup.searchTasks('term', null, url)
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
    expect(results[0].name).toBe('mock task term')
  })
})
