---
name: vuetify
description: Vuetify docs synthesized into agent-focused references (components, theming, migration, API)
metadata:
  author: Cloudburst
  version: 2026.02.11
  source: https://vuetifyjs.com/en/
---

# Vuetify Skill

This skill sources its content from Vuetify's MCP payloads. Prefer the MCP-derived references and the `mcp-integration` guidance in `references/mcp-integration.md`.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| MCP Integration | How to use the MCP payloads as the canonical source of truth for this skill | [mcp-integration](references/mcp-integration.md) |

## Usage

- Use `references/mcp-integration.md` and the MCP JSON payloads as the authoritative source when generating or refreshing derived references.
- To regenerate from MCP, run: `node scripts/generate-skill-from-mcp.js <mcp-url>` and place the resulting payload under `skills/vuetify/references/`.

<!-- Source: Vuetify MCP payloads -->
