---
name: guides-agent-usage
description: Lightweight instructions for loading and using the Cloudburst skill with Copilot or MCP clients.
owner: cb-ops-agent
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
   - Select **cb-agent** from the list; it automatically loads the product, engineering, and ops sub-agents on demand
   - No manual skill prefixing is needed—`cb-agent` handles orchestration and escalations

3. **Describe your task**
   - Tell the agent what you want to build (e.g., "Build a new button variant" or "Implement this Figma component")
   - The agent automatically follows `core-agent-workflow`: intake → plan → build in slices → test → document
   - No need to repeat "load the skills"—cb-agent has them pre-declared

## During Implementation

- `cb-agent` keeps a running TODO list, while `cb-product-agent` and `cb-engineering-agent` post their findings asynchronously.
- Ask the engineering agent for concrete commands (e.g., `pnpm --filter @cloudburst-ui/<pkg> test`) and the product agent for UX/copy critiques.
- Ask `cb-project-agent` to "sync this TODO to ClickUp" or "link PR #123 to task CL-456" whenever work starts or finishes.
- Escalate disagreements by saying “Loop in ops” — `cb-ops-agent` will arbitrate and document the decision.
- Request status snapshots or tooling/log help from `cb-devops-agent` ("DevOps, list blocked tasks" or "DevOps, share latest test logs").
- Whenever you edit skills, prompts, or tooling, say “Change-agent, review this proposal” so it can summarize the diff and ask for your approval before anything lands.

## After Changes

- Ask `cb-agent` to send your retro notes to `cb-learning-agent`; it will draft the doc updates for you
- Agent will suggest updates to the relevant reference file with new patterns discovered
- Ask `cb-project-agent` to log the ClickUp/GitHub linkage and note the release doc entry
- Ask `cb-devops-agent` to post the final status report (what ran, what passed, what remains queued)
- Ask `cb-change-agent` to summarize any pending approvals; confirm or request edits before merging
- Link your PR to the touched reference in the description so reviewers can keep docs in sync
- This keeps the skill graph self-maintaining across iterations

That's it: one-time setup, then just select cb-agent and describe the task.

<!--
Source references:
- skills/AGENTS.md
-->
