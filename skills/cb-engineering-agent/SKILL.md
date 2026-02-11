---
name: cb-engineering-agent
description: Implementation, architecture, and verification guide for Cloudburst’s engineering specialist.
metadata:
  author: Cloudburst Engineering
  version: "2026.2.11"
  source: Cloudburst UI Monorepo + https://github.com/Cloudburst-E/cb-skills
---

# Cloudburst Engineering Agent Skill

> Load this skill when `cb-engineering-agent` needs to turn product briefs into code, refactor packages, or verify deliveries. Pair it with the Vue/Nuxt/Vite skills plus `cb-product-agent` for end-to-end coverage.

## Core Charter

| Topic | Description | Reference |
|-------|-------------|-----------|
| Engineering Agent Charter | Mission, scope, collaboration and tooling expectations. | [roles-engineering-agent](references/roles-engineering-agent.md) |

## Implementation Playbooks

| Topic | Description | Reference |
|-------|-------------|-----------|
| Vue Vibecoding | When to reuse vs. scaffold packages, token usage, and story/test flow. | [core-vue-vibecoding](references/core-vue-vibecoding.md) |
| Component Blueprint | Step-by-step SFC implementation rules sourced from the `.ai` docs. | [core-component-implementation](references/core-component-implementation.md) |
| Package Standards | Naming, scaffolding, script expectations, typography rules. | [core-package-standards](references/core-package-standards.md) |

## Reviews & QA

| Topic | Description | Reference |
|-------|-------------|-----------|
| Storybook Patterns | Required Playground/CompleteShowcase structures and helper controls. | [features-story-patterns](references/features-story-patterns.md) |
| Component Checklist | Merge gate for tokens, tests, props, naming, build commands. | [guides-component-checklist](references/guides-component-checklist.md) |

## Operating Notes

- Mirror each implementation slice with the narrowest verification command; post logs back to `cb-agent` for DevOps/QA tracking.
- Keep `scripts/*.ts` utilities current so scaffolding stays reproducible; sync template tweaks via `scripts/templates/package/`.
- When work needs QA sign-off, coordinate with `cb-ops-agent` and reference the QA skill (`cb-ops-agent` skill → `features-preflight-checks`).
- Hand retrospectives to `cb-learning-agent` after every feature so documentation evolves with the codebase.
