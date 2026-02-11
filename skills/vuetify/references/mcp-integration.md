---
name: mcp-integration
description: How to use the Vuetify MCP as a canonical source for skill generation
---

# Vuetify MCP Integration

Use the Vuetify MCP (https://mcp.vuetifyjs.com/) as a canonical JSON source instead of scraping HTML. This reduces maintenance and produces richer, structured references for agents.

Steps

- Run the helper script: `node scripts/generate-skill-from-mcp.js https://mcp.vuetifyjs.com/`
- The script will save a raw MCP payload to `references/mcp.json` and write `GENERATION.md`.
- Use the `mcp.json` payload to generate or update `SKILL.md` and targeted reference files (components, theming, migration).

Notes

- If the MCP server exposes a specific endpoint (e.g., `/design-context.json`), the script prefers that and falls back to the base URL.
- The raw JSON lets you map routes, components, and tokens programmatically.
- Keep `GENERATION.md` in sync with the source URL and fetch timestamp.

Example (Node):

```js
const data = require('./references/mcp.json');
console.log(data.source, data.fetchedAt);
// Walk data.payload to create targeted markdown files under `references/`
```

<!-- Source: https://mcp.vuetifyjs.com/ -->
