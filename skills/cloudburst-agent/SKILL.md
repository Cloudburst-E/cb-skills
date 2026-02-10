---
name: cloudburst-agent
description: Cloudburst-specific workflow for vibecoding Vue surfaces, importing Figma MCP context, and keeping skills self-maintaining.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.10"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Agent Skill

> Use alongside the standard Vue/Nuxt/Vite skills whenever you touch the Cloudburst UI repos. It encodes how we plan work, reuse packages, translate Figma MCP nodes, and capture prompts so the system improves itself after every change.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Agent Workflow Loop | Intake → plan → build → document loop for every contribution. | [core-agent-workflow](references/core-agent-workflow.md) |
| Vue Vibecoding | How to assemble Cloudburst surfaces with existing packages, tokens, and tests. | [core-vue-vibecoding](references/core-vue-vibecoding.md) |
| Component Implementation | Naming, scaffolding, tokens, tests, and story expectations for new components. | [core-component-implementation](references/core-component-implementation.md) |
| Package Standards | Required package.json, config files, dependencies, and typography rules. | [core-package-standards](references/core-package-standards.md) |

## Features

### Figma Integration

| Topic | Description | Reference |
|-------|-------------|-----------|
| MCP Intake Process | Step-by-step guide for turning Figma nodes into production Vue. | [features-figma-mcp](references/features-figma-mcp.md) |
| Storybook Patterns | Playground + CompleteShowcase patterns, helper controls, and v-model guidance. | [features-story-patterns](references/features-story-patterns.md) |

## Guides

| Topic | Description | Reference |
|-------|-------------|-----------|
| Prompt Kit | Battle-tested prompt snippets for Copilot + MCP tooling. | [guides-prompt-kit](references/guides-prompt-kit.md) |
| Component Prompt Templates | Copy-ready component prompts for single or multi-component builds. | [guides-component-prompts](references/guides-component-prompts.md) |
| Component Review Checklist | Quick verification list for tokens, stories, tests, and naming. | [guides-component-checklist](references/guides-component-checklist.md) |
| Agent Usage | Simple “how to load and run” instructions for teammates. | [guides-agent-usage](references/guides-agent-usage.md) |

## Usage Notes

- Always load `cloudburst-agent` plus the relevant framework skills before editing `frontend/`.
- Run `pnpm run setup:agent` (in `frontend/`) once to install/update the full skills bundle, then use the “Cloudburst Agent Task” preset in VS Code to start chats already scoped to this workflow.
- Reference `features-figma-mcp` when importing MCP data so components stay aligned with tokens and package boundaries.
- Update the references whenever you introduce a new reusable pattern, prop surface, or workflow tweak—this is how the system stays self-maintaining.
- Link pull requests back to the touched reference(s) so reviewers can keep docs and code in sync.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
