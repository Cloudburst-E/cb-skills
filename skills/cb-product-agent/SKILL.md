---
name: cb-product-agent
description: Product strategy, UX, copy, and roadmap guidance for Cloudburst’s agentic workflow.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.11"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Product Agent Skill

> Load this skill whenever `cb-product-agent` needs to scope UX, write product briefs, or prep MCP context. It keeps specs, roadmap docs, and prompt templates aligned with ops-approved guardrails.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Product Agent Charter | Mission, deliverables, escalation rules. | [roles-product-agent](references/roles-product-agent.md) |

## Discovery & Intake

| Topic | Description | Reference |
|-------|-------------|-----------|
| Figma MCP Intake | Exporting nodes, mapping tokens, summarizing specs. | [features-figma-mcp](references/features-figma-mcp.md) |
| Component Prompt Kit | Reusable prompt template for single/multi-component asks. | [guides-component-prompts](references/guides-component-prompts.md) |

## Operating Notes

- Always secure `cb-ops-agent` approval before committing roadmap edits that affect other teams.
- Pair with the engineering skill to translate briefs into implementation plans; use ClickUp custom fields so `cb-project-agent` can sync status.
- When new UX heuristics emerge, ask `cb-learning-agent` to update the charter or create a new reference file under this skill.
- Log every decision under the orchestrator’s decision record so `cb-agent` can brief ops during retros.
