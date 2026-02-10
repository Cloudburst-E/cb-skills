---
name: guides-agent-usage
description: Lightweight instructions for loading and using the Cloudburst skill with Copilot or MCP clients.
---

# Using the Cloudburst Agent

1. **Install the skills bundle once**
   - From `frontend/`, run `pnpm run setup:agent`. The script wraps the `pnpx skills add Cloudburst-E/cb-skills --skill ...` command so nobody has to memorize it.

2. **Start a Copilot session in one click**
   - In VS Code, open Copilot Chat and choose the “Cloudburst Agent Task” preset (defined in `.vscode/copilot-chat.json`). It automatically loads `cloudburst-agent` + framework skills and references `core-agent-workflow`.
   - Fill in the task argument with the component request, including any Figma URLs.

3. **Kick off work**
   - Use the unified template in [guides-component-prompts](references/guides-component-prompts.md) or the snippets in [guides-prompt-kit](references/guides-prompt-kit.md) to supply details the preset can’t infer.
   - Ensure the agent explicitly follows `core-agent-workflow` so it plans → builds → documents.

4. **During implementation**
   - Have the agent cite whichever reference it relies on (`core-component-implementation`, `features-figma-mcp`, etc.).
   - Request Storybook/Test commands explicitly (e.g., “run `pnpm --filter @cloudburst-ui/<pkg> test`”).

5. **After changes**
   - Update the relevant reference file with new patterns or decisions.
   - Mention the touched reference in PR descriptions so reviewers know where to sync docs.

That’s it: load the skills once, reuse the prompts, and keep the docs in sync after each task.

<!--
Source references:
- skills/AGENTS.md
-->
