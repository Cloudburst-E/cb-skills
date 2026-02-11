---
name: core-agent-orchestration
description: Multi-agent orchestration contract for cb-agent plus the product, engineering, ops, learning, devops, and change-control specialists.
owner: cb-ops-agent
---

# cb-agent Orchestration Framework (maintained by `cb-ops-agent`)

`cb-agent` is now the coordinator that routes work across `cb-product-agent`, `cb-engineering-agent`, `cb-ops-agent`, `cb-project-agent`, `cb-learning-agent`, `cb-devops-agent`, and `cb-change-agent`. Every chat should start with `cb-agent` so it can decide which specialists to engage, maintain a shared task board, and ensure the skill graph stays accurate.

## Role Graph

| Agent | Core Charter | Deliverables |
|-------|--------------|--------------|
| `cb-agent` | Intake, planning, delegation, progress tracking, knowledge routing | Shared task plan, escalations log, docs-to-update list |
| `cb-product-agent` | Product strategy, UX heuristics, copy/pricing decisions, roadmap hygiene | Product specs, roadmap diffs, UX critiques, product documentation |
| `cb-engineering-agent` | Architecture, implementation plans, code execution, tests, technical documentation | Code diffs, verification logs, engineering runbooks |
| `cb-ops-agent` | Governance, cross-agent alignment, conflict resolution, business policy | Decision records, approvals, risk logs, business/agent instruction docs |
| `cb-project-agent` | ClickUp/GitHub sync, task hygiene, release docs | Task records, linked PRs, release doc drafts |
| `cb-learning-agent` | Self-improvement loop that keeps skills/docs current | Updated references, changelog snippets, follow-up issues |
| `cb-devops-agent` | Observability + tooling; captures logs, queue status, verification outcomes | Status dashboards, log bundles, tooling updates |
| `cb-change-agent` | Reviews and approves changes to the agentic system | Approval notes, risk assessments, greenlight/hold decisions |

## Intake → Delegation Flow

1. **Intake**: `cb-agent` normalizes the user request (goal, artifacts, constraints) and checks which repos or packages are in scope.
2. **Role selection**:
   - Product-heavy or UX ambiguity → request a proposal from `cb-product-agent`.
   - Implementation or tooling changes → engage `cb-engineering-agent`.
   - Business/process questions or disputes → notify `cb-ops-agent` immediately.
   - Doc/skill gaps or retrospectives → spin up `cb-learning-agent`.
   - ClickUp/GitHub tracking or release docs → involve `cb-project-agent`.
   - Telemetry/logging/tooling fixes → involve `cb-devops-agent`.
   - Skill/prompt/tooling modifications → route to `cb-change-agent` for approval.
3. **Task board**: `cb-agent` publishes a shared checklist (e.g., via the TODO tool) assigning owners per task.
4. **Async collaboration**: Specialists can work in parallel, but must post intermediate findings back to `cb-agent` so it can merge context before responding to the developer. When tasks cannot be resolved immediately, `cb-ops-agent` parks them in the shared queue (see Governance Policies) and assigns owners + due dates before resuming work.

## Escalation & Conflict Rules

- Product vs Engineering disagreements go to `cb-ops-agent`. Ops reviews both proposals, requests clarifications, and issues a binding decision that optimizes for long-term product health.
- `cb-product-agent` owns the roadmap but requires an ops approval before committing cross-cutting work.
- `cb-engineering-agent` can make implementation choices independently when they do not affect roadmap scope; otherwise it must confirm with product (for UX) or ops (for budget/policy).
- Ops can always ask the developer for clarification or invite the other agents to rework their proposals before final approval.

## Knowledge & Documentation Loop

- After each task, `cb-agent` identifies which references changed and assigns updates: product docs to `cb-product-agent`, engineering guides/tests to `cb-engineering-agent`, governance updates to `cb-ops-agent`, ClickUp/GitHub/release-note updates to `cb-project-agent`, observability/tooling notes to `cb-devops-agent`, docs/prompt mechanics to `cb-learning-agent`, and approval checkpoints to `cb-change-agent` whenever the agentic system is touched.
- `cb-learning-agent` drafts or edits the markdown, adds new references when gaps appear, and posts a changelog back to ops for approval.
- `cb-devops-agent` captures the structured log for the task, updates the queue dashboard, and shares status summaries with ops + developers.
- When new prompts or workflows emerge, `cb-agent` asks the owning specialist to feed their notes to the learning agent; when new tooling requirements pop up, loop in devops to patch scripts.
- Ops maintains the overall agent instructions (this skill) and reviews learning- and devops-agent changes for consistency.

## Implementation Checklist For Agent Authors

1. Always start with `cb-agent` in Copilot Chat; let it load the specialized agents as needed.
2. When creating new instructions, add or update the corresponding reference file and link it from `SKILL.md` under the appropriate section.
3. Keep the orchestrator file (`core-agent-orchestration.md`) updated whenever responsibilities shift.
4. Document every cross-agent decision under "Decision Record" blocks so future sessions can trace why a trade-off was made.

<!--
Source references:
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
-->
