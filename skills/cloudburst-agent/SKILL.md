---
name: cloudburst-agent
description: Cloudburst-specific workflow for vibecoding Vue surfaces, importing Figma MCP context, and keeping skills self-maintaining.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.11"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Agent Skill

> `cb-agent` is the orchestrator. Load this skill (plus Vue/Nuxt/Vite) whenever you touch the Cloudburst UI repos so the agent squad follows the same intake → plan → build → document loop and escalates correctly.

## Orchestrator Runbook

| Topic | Description | Reference |
|-------|-------------|-----------|
| Multi-Agent Orchestration | Routing, delegation, escalation, and decision-record rules for the whole squad. | [core-agent-orchestration](references/core-agent-orchestration.md) |
| Agent Workflow Loop | Intake → plan → slice → verify → document loop every agent must follow. | [core-agent-workflow](references/core-agent-workflow.md) |

## Specialist Skill Packs

| Skill | Focus | Key References |
|-------|-------|----------------|
| [cb-product-agent](../cb-product-agent/SKILL.md) | Product briefs, UX/copy reviews, roadmap hygiene, MCP exports. | [roles-product-agent](../cb-product-agent/references/roles-product-agent.md) |
| [cb-engineering-agent](../cb-engineering-agent/SKILL.md) | Architecture plans, component/package implementation, Storybook/tests. | [roles-engineering-agent](../cb-engineering-agent/references/roles-engineering-agent.md) |
| [cb-ops-agent](../cb-ops-agent/SKILL.md) | Governance, change control, QA/preflight, ClickUp/GitHub automation, onboarding. | [roles-ops-agent](../cb-ops-agent/references/roles-ops-agent.md) |

Use these skill packs in addition to the base frameworks so each specialist has self-contained references while `cb-agent` coordinates their output.

## Cross-Agent Utilities

| Topic | Description | Reference |
|-------|-------------|-----------|
| Prompt Kit | Battle-tested prompt snippets for Copilot + MCP tooling. | [guides-prompt-kit](references/guides-prompt-kit.md) |

## Usage Notes

- Run `pnpm run setup:agent` inside `frontend/` to install the bundle (`cloudburst-agent`, `cb-product-agent`, `cb-engineering-agent`, `cb-ops-agent`, plus Vue/Nuxt/Vite/etc.) from the local `cb-skills` checkout when available.
- Start chats with `cb-agent`. It spins up product, engineering, and ops specialists automatically; escalate disagreements per [core-agent-orchestration](references/core-agent-orchestration.md).
- `cb-agent` maintains the TODO board. Ask it to share owners/status, then have `cb-project-agent` mirror the same tasks in ClickUp. Ops remains the source of truth for approvals.
- When you learn something reusable, ping `cb-learning-agent` so it files updates inside the relevant specialist skill; route any workflow/tooling edits through `cb-change-agent` before merging.
- Always link PRs back to the reference files you touched so reviewers can confirm docs + code stay in lockstep.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
