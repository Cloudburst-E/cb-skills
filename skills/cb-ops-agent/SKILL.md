---
name: cb-ops-agent
description: Governance, program management, QA, and enablement guidance for Cloudburst’s ops specialist.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.11"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Ops Agent Skill

> Load this skill when `cb-ops-agent` needs to arbitrate decisions, maintain onboarding docs, run QA, or coordinate ClickUp/GitHub automation. Ops leads the multi-agent collective—use these references to keep governance tight without slowing dev velocity.

## Governance & Approvals

| Topic | Description | Reference |
|-------|-------------|-----------|
| Ops Agent Charter | Mission, decision policies, delegation, tooling expectations. | [roles-ops-agent](references/roles-ops-agent.md) |
| Change Control Agent | Guardrails for editing skills, prompts, presets, or scripts. | [roles-change-control-agent](references/roles-change-control-agent.md) |
| QA Agent Charter | Trigger points and collaboration contracts for preflight runs. | [roles-qa-agent](references/roles-qa-agent.md) |
| Preflight Bundle | Exact command order, auto-fix recipes, reporting template. | [features-preflight-checks](references/features-preflight-checks.md) |

## Program & Communications

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Agent Charter | ClickUp/GitHub task lifecycle, release docs, backlog hygiene. | [roles-project-agent](references/roles-project-agent.md) |
| DevOps Agent Charter | Telemetry, logging, tooling upkeep, daily/weekly comms. | [roles-devops-agent](references/roles-devops-agent.md) |
| ClickUp Integrations | Task schema, API wrapper tips, webhook wiring, email cadence. | [features-clickup-integrations](references/features-clickup-integrations.md) |
| Agent Usage Guide | Onboarding steps for developers/LT to run the multi-agent preset. | [guides-agent-usage](references/guides-agent-usage.md) |

## Knowledge & Continuous Improvement

| Topic | Description | Reference |
|-------|-------------|-----------|
| Learning Agent Charter | Self-improvement loop and doc ownership. | [roles-learning-agent](references/roles-learning-agent.md) |

## Operating Notes

- Ops owns the shared task queue: keep TODO statuses aligned between Copilot TODOs and ClickUp lists; escalate blockers early.
- When product vs. engineering disagree, collect both proposals, document trade-offs, and issue a decision record inside `core-agent-orchestration`.
- Before shipping, confirm `cb-qa-agent` ran the preflight bundle and hand the report to `cb-devops-agent` for logging.
- Update onboarding docs whenever scripts or presets change; ensure `pnpm run setup:agent` installs the latest skill bundle (cloudburst + specialized skills).
