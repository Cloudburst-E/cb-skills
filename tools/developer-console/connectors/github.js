// Simple GitHub connector stub. Returns mock results when no token provided.

async function searchPRs(query, _token, baseUrl) {
  if (!query) {
    return []
  }
  // If token provided, call GitHub Search API (PRs) and map results
  if (_token) {
    const apiBase = baseUrl || 'https://api.github.com'
    const url = `${apiBase.replace(/\/$/, '')}/search/issues?q=${encodeURIComponent(query)}+type:pr`
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${_token}`,
        'User-Agent': 'cb-developer-console',
        Accept: 'application/vnd.github.v3+json',
      },
    })
    const data = await res.json()
    if (!data || !data.items) return []
    return data.items.map((it) => ({
      id: it.number,
      title: it.title,
      url: it.html_url,
      author: it.user && it.user.login,
      status: it.state,
    }))
  }

  // Prototype/mock mode
  return [
    {
      id: 123,
      title: `Mock PR matching "${query}"`,
      url: 'https://github.com/your-org/your-repo/pull/123',
      author: 'dev@example.com',
      status: 'open',
    },
  ]
}

module.exports = { searchPRs }
