const nock = require('nock')
const { describe, it, expect } = require('vitest')
const github = require('../connectors/github')

describe('github connector', () => {
  it('returns mapped results when token provided', async () => {
    const query = 'fix bug'
    const scope = nock('https://api.github.com')
      .get('/search/issues')
      .query((q) => q.q && q.q.includes('fix%20bug'))
      .reply(200, {
        items: [
          {
            number: 42,
            title: 'Fix bug in widget',
            html_url: 'https://github.com/org/repo/pull/42',
            user: { login: 'alice' },
            state: 'open',
          },
        ],
      })

    const results = await github.searchPRs(query, 'fake-token')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(42)
    expect(results[0].author).toBe('alice')
    scope.done()
  })
})
