// ClickUp connector stub. Intentionally returns no live data by default.
// Enable only after thorough local testing and providing a non-production token.

async function searchTasks(query, _token, baseUrl) {
  if (!query) {
    return []
  }

  // If a baseUrl is provided (e.g., a mock server), call it.
  if (baseUrl) {
    const url = `${baseUrl.replace(/\/$/, '')}/tasks?search=${encodeURIComponent(query)}`
    const res = await fetch(url, {
      headers: _token ? { Authorization: `Bearer ${_token}` } : {},
    })
    const data = await res.json()
    // Accept a `{ tasks: [...] }` shape or raw array
    return data.tasks || data
  }

  // Disabled/default stub response to avoid touching live ClickUp accounts
  return [
    {
      id: 'CU-STUB-1',
      name: `ClickUp connector is disabled in prototype mode. Query: ${query}`,
    },
  ]
}

module.exports = { searchTasks }
