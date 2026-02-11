---
name: guides-prompt-kit
description: Ready-to-use prompts for Copilot to leverage Cloudburst skills and workflows
owner: cb-agent
---

# Cloudburst Prompt Kit

Use these lightweight prompts to steer Copilot (or any MCP-aware agent) toward the Cloudburst workflow. Customize the bracketed sections before sending. Start each chat with `cb-agent`; call out which specialist (product, engineering, ops) you want to lead if it is not obvious.

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

## 6. Self-Improvement / Doc Updates

> "Collect the following learnings from today’s session [...]. Have `cb-learning-agent` draft updates for [reference paths], add any new files needed, and summarize the changes so I can review the diff."

Follow-up:

> "Scan git history since the last release for undocumented patterns. Recommend which references `cb-learning-agent` should refresh and outline the edits."

## 7. Telemetry / Status Reporting

> "Ask `cb-devops-agent` for the current queue state, recent command failures, and any blocked tasks. Include owners, due dates, and the commands required to unblock them."

Follow-up:

> "Collect test/lint/build logs from the last run, attach them to this chat, and summarize actionable debugging steps for engineering."

## 8. ClickUp / GitHub Sync

> "Project-agent, create a ClickUp task under [list] for this TODO, fill in repo path `[path]`, link to [skill ref], and set owner to Engineering."

Follow-up:

> "Link GitHub PR #[number] and last Actions run to ClickUp task [ID]; update status to Review and post a comment summarizing blockers."

## 9. Change Control / Approvals

> "Change-agent, review the proposed edits to [files]. Summarize risks, required tests, and request my approval before applying them."

Follow-up:

> "List all pending change-control approvals for today, grouped by agent, and highlight anything blocking release notes."

<!--
Source references:
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
