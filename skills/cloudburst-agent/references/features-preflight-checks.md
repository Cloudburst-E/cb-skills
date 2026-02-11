---
name: features-preflight-checks
description: Command bundle and workflow for the QA/preflight agent.
owner: cb-qa-agent
---

# Preflight Verification Bundle

This playbook enumerates the commands and remediation steps the QA agent must follow before commits or releases.

## Commands & Order

1. **Formatting**
   - `pnpm -w format` (dry run)
   - If failures → `pnpm -w format:fix`
2. **Linting**
   - `pnpm -w check` (Biome lint)
3. **Type Checks**
   - `pnpm run type-check`
4. **Package Tests**
   - `pnpm --filter @cloudburst-ui/* test -- --run`
5. **App Tests**
   - `pnpm --filter ./apps/** test -- --run` (or targeted app `pnpm --filter web test -- --run`)
6. **Package Builds**
   - `pnpm --filter @cloudburst-ui/* build`
7. **App Builds**
   - `pnpm --filter web build`

## Automation Tips

- `pnpm run preflight` (see `frontend/scripts/run-preflight.ts`) runs the sequence end-to-end and writes per-command logs to `.logs/preflight/<timestamp>-<command>.log`.
- Allow concurrent sub-runs (e.g., run package tests + builds in parallel) when system resources allow; otherwise follow strict order for deterministic logs.
- Stop on first failure unless the failure is auto-fixable (formatting, missing deps) and re-run.

## Auto-Fix Recipes

| Failure Type | Remediation |
|--------------|-------------|
| Formatting diff | Run `pnpm -w format:fix` and re-check |
| Missing TS references | `pnpm run update-tsconfig-refs` then rerun type-check |
| Missing deps | `pnpm install` (workspace) |
| Outdated generated files (Vuetify colors, schema) | Run `pnpm gen:theme` or `pnpm gen:schema` as indicated |

## Reporting Template

```
QA Preflight Report – <date>
Commands:
1. pnpm -w format ✅
2. pnpm -w check ✅
3. pnpm run type-check ❌
   - Error: Cannot find module ...
   - Fix attempt: pnpm run update-tsconfig-refs ➜ success; reran, now ✅
4. pnpm --filter @cloudburst-ui/* test -- --run ✅
...
Summary: All commands pass after auto-fix. Ready for merge.
```

Post this summary to:
- DevOps (for daily email)
- ClickUp task (via project-agent)
- Change-agent when approvals depend on QA pass

<!--
Source references:
- Cloudburst QA checklist (2026-02-11)
-->
