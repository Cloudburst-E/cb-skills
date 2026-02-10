---
name: guides-prompt-kit
description: Ready-to-use prompts for Copilot to leverage Cloudburst skills and workflows
---

# Cloudburst Prompt Kit

Use these lightweight prompts to steer Copilot (or any MCP-aware agent) toward the Cloudburst workflow. Customize the bracketed sections before sending.

## 1. Figma → Vue Translation

> "Load the `cloudburst-agent` and `vue` skills. Pull Figma node [URL or node-id], summarize the layers, and propose a component tree using existing `@cloudburst-ui/*` packages. Highlight which props/variants we need to add and map every color/typography token to `packages/design-tokens`."

Follow-up:

> "Generate the Vue SFC skeleton (script/setup/template/style) for the [component/package]. Use tokens first, Vuetify fallbacks second, and document open questions under `features-figma-mcp.md`."

## 2. Component Extension

> "With the `cloudburst-agent` + `pinia` skills loaded, extend `@cloudburst-ui/[component]` to support [new behavior]. Outline prop changes, slot additions, and tests. Include the commands required to run package + app tests."

## 3. Architecture Cleanup

> "Scan `apps/[target-app]` and `packages/*` for duplicated [pattern]. Recommend a consolidation plan that keeps the repo scalable and describe which skills/docs must be updated once the refactor lands."

## 4. Documentation / Skill Refresh

> "Summarize what changed in [short description], specify which `skills/cloudburst-agent/references/*` files need edits, and draft the bullet points so I can paste them into the skill. Confirm the source links you used."

## 5. Test Accuracy Sweep

> "Run through the `@cloudburst-ui/[package]` vitest suite in analysis mode. List flaky tests, missing interaction coverage, and the quickest way to add regression cases. Reference the Cloudburst agent workflow when proposing fixes."

Keep this file short and actionable—when a new recurring prompt emerges, add it here and cross-link the relevant reference.

<!--
Source references:
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
