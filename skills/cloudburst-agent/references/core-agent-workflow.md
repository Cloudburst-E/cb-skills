---
name: core-agent-workflow
description: Cloudburst agent runbook for planning, implementing, and documenting UI changes across repos
---

# Cloudburst Agent Workflow

Use this loop whenever the Copilot agent receives a natural-language build request for the Cloudburst UI stack. The goal is to keep delivery predictable, reproducible, and self-documenting.

## 1. Intake & Context Sweep

1. Normalize the ask into the trifecta: **surface** (which app under `apps/` or package under `packages/`), **experience** (component or flow), **integration** (API, state, theme).
2. Load the relevant baseline skills (`vue`, `nuxt`, `pinia`, `vite`, `vitepress`) plus this `cloudburst-agent` skill so the agent can cite both OSS docs and Cloudburst conventions.
3. Skim the target code:
   - Apps live in `frontend/apps/*`; component packages live in `frontend/packages/*` with the `@cloudburst-ui/*` namespace.
   - Tokens + themes start in `packages/design-tokens` and flow into `apps/web/src/plugins/vuetify.ts`.
   - Shared helpers (test, theme, scripts) live under `test_setup/` and `scripts/`.

## 2. Plan Before You Type

1. Write a short task plan:
   - Data & state requirements (`Pinia`, `vue-query`, composables?).
   - UI architecture (reuse an existing package vs. scaffold a new one via `pnpm run create <name>`).
   - Theming contract (tokens vs. Vuetify runtime vars) and accessibility expectations.
2. Identify verification steps up front:
   - `pnpm --filter <pkg> test`
   - `pnpm --filter <app> test`
   - `pnpm devapp <app>` for manual QA
   - `pnpm run type-check`
3. Decide whether this work requires updating or adding a skill reference. If the answer is yes, reserve a section name now (e.g., `references/features-figma-mcp.md`).

## 3. Build in Small, Testable Slices

1. Scaffold or update components in their owning package. Keep exports slim via each package's `src/index.ts`.
2. Wire data/state hooks next, then templates/styles. Always import from `@cloudburst-ui/*` before reaching for ad-hoc markup.
3. After each slice, run the narrowest possible verification command (unit test, story, or Vitest suite). Fix lint/type issues before continuing.
4. Finish by running the workspace-level commands agreed upon during planning.

## 4. Document & Propagate Knowledge

1. Update or add references under `skills/cloudburst-agent/references/*` when a new pattern, constraint, or workflow emerges.
2. Record prompt snippets or agent operating tips inside `guides-prompt-kit.md` so future sessions can reuse them.
3. Cross-link changed sections from pull requests to their corresponding skill references so reviewers know which knowledge file to refresh next time.
4. When the loop uncovers a missing component or helper, open a tracking issue and note it under "Gaps" in the skill reference you touched.

Staying disciplined about this loop keeps the repo clean _and_ improves the skill graph every time we ship.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- https://github.com/Cloudburst-E/cb-skills/blob/main/AGENTS.md
-->
