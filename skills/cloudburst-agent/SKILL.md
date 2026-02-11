---
name: cloudburst-agent
description: Cloudburst-specific workflow for vibecoding Vue surfaces, importing Figma MCP context, and keeping skills self-maintaining.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.11"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Agent Skill

> Use alongside the standard Vue/Nuxt/Vite skills whenever you touch the Cloudburst UI repos. It encodes how we plan work, reuse packages, translate Figma MCP nodes, and now orchestrate a multi-agent workflow where `cb-agent` delegates to product, engineering, and ops specialists.

## Orchestrated Agent Team

| Topic | Description | Reference |
|-------|-------------|-----------|
| Multi-Agent Orchestration | Routing, delegation, and escalation rules for the full agent squad. | [core-agent-orchestration](references/core-agent-orchestration.md) |
| Product Agent Charter | Responsibilities, deliverables, and collaboration rules for `cb-product-agent`. | [roles-product-agent](references/roles-product-agent.md) |
| Engineering Agent Charter | Implementation runbook for `cb-engineering-agent`. | [roles-engineering-agent](references/roles-engineering-agent.md) |
| Ops Agent Charter | Governance, approvals, and conflict resolution guidelines for `cb-ops-agent`. | [roles-ops-agent](references/roles-ops-agent.md) |
| Project Agent Charter | ClickUp/GitHub program-management duties and task syncing. | [roles-project-agent](references/roles-project-agent.md) |
| Learning Agent Charter | Self-improvement loop that ingests feedback and updates skills/docs. | [roles-learning-agent](references/roles-learning-agent.md) |
| DevOps Agent Charter | Observability, tooling, logging, and reporting for all agents. | [roles-devops-agent](references/roles-devops-agent.md) |
| Change-Agent Charter | Guardrails and approval workflow for modifications to the agentic system. | [roles-change-control-agent](references/roles-change-control-agent.md) |
| QA Agent Charter | Preflight verification (format/lint/type/test/build) and auto-fix loop. | [roles-qa-agent](references/roles-qa-agent.md) |

## Engineering References

| Topic | Description | Owner | Reference |
|-------|-------------|-------|-----------|
| Agent Workflow Loop | Intake → plan → build → document loop for every contribution. | `cb-agent` | [core-agent-workflow](references/core-agent-workflow.md) |
| Vue Vibecoding | How to assemble Cloudburst surfaces with existing packages, tokens, and tests. | `cb-engineering-agent` | [core-vue-vibecoding](references/core-vue-vibecoding.md) |
| Component Implementation | Naming, scaffolding, tokens, tests, and story expectations for new components. | `cb-engineering-agent` | [core-component-implementation](references/core-component-implementation.md) |
| Package Standards | Required package.json, config files, dependencies, and typography rules. | `cb-engineering-agent` | [core-package-standards](references/core-package-standards.md) |
| Storybook Patterns | Playground + CompleteShowcase patterns, helper controls, and v-model guidance. | `cb-engineering-agent` | [features-story-patterns](references/features-story-patterns.md) |
| Component Review Checklist | Quick verification list for tokens, stories, tests, and naming. | `cb-engineering-agent` | [guides-component-checklist](references/guides-component-checklist.md) |
| Preflight Verification Bundle | Command order, auto-fix recipes, reporting template for QA agent. | `cb-qa-agent` | [features-preflight-checks](references/features-preflight-checks.md) |

## Product & Program References

| Topic | Description | Owner | Reference |
|-------|-------------|-------|-----------|
| MCP Intake Process | Step-by-step guide for turning Figma nodes into production Vue. | `cb-product-agent` + `cb-engineering-agent` | [features-figma-mcp](references/features-figma-mcp.md) |
| Component Prompt Templates | Copy-ready component prompts for single or multi-component builds. | `cb-product-agent` | [guides-component-prompts](references/guides-component-prompts.md) |
| ClickUp/GitHub Automation | Task schema, API tips, release-note workflow, and email cadence. | `cb-project-agent` + `cb-devops-agent` | [features-clickup-integrations](references/features-clickup-integrations.md) |

## Ops & Enablement

| Topic | Description | Owner | Reference |
|-------|-------------|-------|-----------|
| Prompt Kit | Battle-tested prompt snippets for Copilot + MCP tooling. | `cb-agent` | [guides-prompt-kit](references/guides-prompt-kit.md) |
| Agent Usage | Simple “how to load and run” instructions for teammates. | `cb-ops-agent` | [guides-agent-usage](references/guides-agent-usage.md) |
| Self-Improvement Agent | How `cb-learning-agent` ingests feedback and updates docs autonomously. | `cb-ops-agent` | [roles-learning-agent](references/roles-learning-agent.md) |
| DevOps / Telemetry | Logging, reporting, and tooling maintenance workflow. | `cb-ops-agent` | [roles-devops-agent](references/roles-devops-agent.md) |
| Change Control Workflow | Approval process for edits to skills, prompts, and tooling. | `cb-ops-agent` | [roles-change-control-agent](references/roles-change-control-agent.md) |

## Usage Notes

- Always load `cloudburst-agent` plus the relevant framework skills before editing `frontend/`.
- Start chats with `cb-agent`. It will spin up `cb-product-agent`, `cb-engineering-agent`, and `cb-ops-agent` as needed; escalate disagreements following [core-agent-orchestration](references/core-agent-orchestration.md).
- Run `pnpm run setup:agent` (in `frontend/`) once to install/update the full skills bundle, then use the “Cloudburst Agent Task” preset in VS Code to start chats already scoped to this workflow.
- When tasks introduce new UX/product rules, let `cb-product-agent` update the appropriate reference. Engineering changes go through `cb-engineering-agent`, governance updates route to `cb-ops-agent`, ClickUp/GitHub sync + release docs run through `cb-project-agent`, QA/preflight loops run through `cb-qa-agent`, continuous improvements/document upkeep are delegated to `cb-learning-agent`, observability/tooling updates are owned by `cb-devops-agent`, and **any modifications to the agentic system itself must be reviewed by `cb-change-agent` before landing**.
- Reference `features-figma-mcp` when importing MCP data so components stay aligned with tokens and package boundaries.
- Update the references whenever you introduce a new reusable pattern, prop surface, or workflow tweak—this is how the system stays self-maintaining.
- Link pull requests back to the touched reference(s) so reviewers can keep docs and code in sync.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
