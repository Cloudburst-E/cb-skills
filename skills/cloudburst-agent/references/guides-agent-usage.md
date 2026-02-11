---
name: guides-agent-usage
description: Lightweight instructions for loading and using the Cloudburst skill with Copilot or MCP clients.
---

# Using the Cloudburst Agent

## Fresh Environment Setup

1. **Install skills and dependencies** (one-time)
   ```bash
   # From frontend/
   pnpm install
   pnpm run setup:agent
   ```
   This installs the full Cloudburst skills bundle (`cloudburst-agent`, `vue`, `nuxt`, `pinia`, `vite`, `vitest`, `unocss`, `pnpm`) to `~/.agents/skills/`.

2. **Select the agent in VSCode**
   - Open **Copilot Chat** in VS Code
   - Look for the **agents dropdown** at the top of the chat panel
   - Select **cb-agent** from the list
   - All skills load automatically (no manual prefixing needed)

3. **Describe your task**
   - Tell the agent what you want to build (e.g., "Build a new button variant" or "Implement this Figma component")
   - The agent automatically follows `core-agent-workflow`: intake → plan → build in slices → test → document
   - No need to repeat "load the skills"—cb-agent has them pre-declared

## During Implementation

- Agent will cite the relevant skill references (`core-component-implementation`, `features-figma-mcp`, etc.)
- Request specific test/story commands if needed (e.g., "run `pnpm --filter @cloudburst-ui/<pkg> test`")
- Let the agent create task items and track progress through the workflow

## After Changes

- Agent will suggest updates to the relevant reference file with new patterns discovered
- Link your PR to the touched reference in the description so reviewers can keep docs in sync
- This keeps the skill graph self-maintaining across iterations

That's it: one-time setup, then just select cb-agent and describe the task.

<!--
Source references:
- skills/AGENTS.md
-->
