# CB Crew Migration Blueprint

## Objectives

1. Preserve the curated Cloudburst knowledge base (`cb-skills`) while standing up a CrewAI runtime (`cb-crew`) that can execute the same policies with better orchestration, autonomy controls, and tooling.
2. Allow engineers to A/B test both stacks by running each agent package in its own VS Code chat session with zero manual switching inside the developer console.
3. Keep the developer console as the single UX surface, layering Crew run insights, approvals, and event feeds without diverging from Cloudburst design tokens/components.
4. Maintain safety, auditability, and change-control via the existing governance patterns (e.g., change agent approvals, ClickUp/PR sync) regardless of the runtime implementation.

## Target Architecture

### Repositories

| Repo | Purpose | Notes |
|------|---------|-------|
| `cb-skills` | Canonical knowledge: skills markdown, generation scripts, governance docs. | Remains single source of truth. Continue recording upstream SHAs. |
| `cb-crew` (new) | CrewAI OSS runtime: crew definitions, adapters, tool registry, CI, integration tests. | Python project pinned to CrewAI OSS release. Provides CLI + MCP hooks. |

### Layering

1. **Knowledge Adapter Layer**
   - Converts skill markdown + metadata into CrewAI role prompts, success metrics, and memory stores.
   - Lives in `cb-crew/adapters/skills_adapter.py` and pulls files from `../cb-skills/skills/**`. Supports caching.
2. **Crew Definitions**
   - Mirror existing orchestrator layout: `cb-crew/crews/cloudburst.py` instantiates orchestrator + product/engineering/ops agents.
   - Each agent references the adapter output rather than hard-coded prompts.
3. **Tool Registry**
   - Wrap existing integrations (ClickUp, GitHub, component catalog) as CrewAI Tools with scoped permissions and dry-run toggles.
   - Reuse upstream CrewAI tools wherever possible to avoid duplicate implementations.
4. **Developer Console Integration**
   - Extend the VS Code webview to show Crew run history, approvals, and toggles between `cb-agent` (skills) and `cb-crew` (CrewAI) executions.
   - Provide an API shim so the console can talk to either runtime through a consistent interface.

## Skills → Crew Mapping

| Skill / Role | CrewAI Agent | Notes |
|--------------|--------------|-------|
| `cloudburst-agent` orchestrator | `cb_orchestrator` | Drives core workflow, routes tasks, enforces `core-agent-workflow`. |
| `cb-product-agent` | `product_lead_agent` | Prompt seeds pulled from `skills/cb-product-agent`. Tools: ClickUp read, Figma intake, portal insights. |
| `cb-engineering-agent` | `engineering_lead_agent` | Uses component implementation skills, triggers code generation + tests via MCP. |
| `cb-ops-agent` (ops/project/change/devops) | Split into `ops_agent`, `change_guard_agent`, `devops_agent`. Each agent references relevant skill subfolders; governance logic encoded as CrewAI checklists. |
| Generated framework skills (Vue, Nuxt, etc.) | Shared memory stores | Loaded on demand per task; caching to prevent redundant context loading. |

Adapter responsibilities:
- Parse frontmatter for `name`, `description`, `category`.
- Normalize into CrewAI prompt sections (mission, constraints, references, guardrails).
- Attach source links for audit trails.

## Execution Phases

1. **Phase 0 – Research & Validation (Complete before coding)**
   - Confirm CrewAI OSS licensing, roadmap, and API surface vs. AMP features. AMP (CrewStudio) is **not** included in OSS, so plan to replicate essentials locally.
   - Document must-have AMP features (crew list, run status, approval queue) to re-create in the developer console.

2. **Phase 1 – Bootstrap `cb-crew` Repo**
   - Initialize Python project with `poetry` or `uv` (pin CrewAI version, e.g., `crewai==0.x.y`).
   - Scaffold directories: `crews/`, `agents/`, `tools/`, `adapters/`, `tests/`, `scripts/`.
   - Add Makefile / tasks (lint, type-check via `ruff` + `pyright`).
   - Configure CI (GitHub Actions) for lint + unit tests.

3. **Phase 2 – Adapter Implementation**
   - Build converter that reads `cb-skills/skills/**/SKILL.md` and reference files.
   - Emit cached JSON artifacts (e.g., `.crewcache/agent_prompts.json`).
   - Unit-test parsing (markdown fixtures → Crew prompt objects).

4. **Phase 3 – Crew Definitions & Tools**
   - Implement `cb_orchestrator` wiring product/engineering/ops agents.
   - Wrap integrations:
     - GitHub (read/write PR comments, diff summaries).
     - ClickUp (ticket fetch/update; start in dry-run).
     - Frontend repo commands (pnpm scripts) via secure shell exec tool.
   - Add sandbox enforcement + rate limits.

5. **Phase 4 – Developer Console Upgrades**
   - Add runtime selector (Skills vs. Crew) in the VS Code extension.
   - Surface Crew run stream (steps, outcomes, tool usage) similar to AMP.
   - Inject contextual data (current branch, PR, component health) per user request.

6. **Phase 5 – Dual-Run Pilot & Audit**
   - Define benchmark tasks; run through both runtimes; capture diffs in outputs, timing, resource use.
   - Feed results into `cb-learning-agent` flow; update skills or Crew configs where drift is detected.
   - Formalize go/no-go checklist for full migration.

## Testing & Safety

- $\text{Regression}_{\text{skills vs crew}}$ = run identical prompts across both systems and diff outputs ($\Delta$). Track metrics (tokens, duration, success rate).
- Enable tool-level logging + redaction (no secrets persisted).
- Run security scans on CrewAI dependencies; pin hashes in `requirements.lock`.
- Keep `cb-change-agent` as a mandatory step for modifying adapters, tools, or governance prompts.

## Deliverables Checklist

- [x] `cb-crew` repo scaffolded with CrewAI deps, CI, linting.
- [x] Skills adapter translating markdown → Crew prompts.
- [x] Crew definitions matching current agents.
- [x] Tool registry with ClickUp, GitHub, repo automation, and mocks for local dev.
- [x] Developer console runtime selector + Crew run viewer.
- [x] Dual-run test suite + documentation of results.
- [x] Updated docs (this file, README updates, onboarding guides).

### Status Snapshot (2026-02-12)

- `cb-crew` onboarding + dual-run guides published under [docs/](../../cb-crew/docs).
- Developer console exposes runtime selector, Crew run telemetry, and shortcuts to the migration blueprint.
- Dual-run harness logging to `.crewlogs/dual_runs/` enables output comparisons; awaiting cb-agent notes for each benchmark.
- Next focus: run the pilot benchmarks through both runtimes, capture regressions, and feed learnings to `cb-learning-agent`.

## Outstanding Questions / Decisions

1. Preferred Python toolchain (`poetry`, `uv`, or `pip-tools`)? → **Use `uv`** for speed, lockfiles, and modern packaging support.
2. Hosting for Crew run logs (local filesystem vs. lightweight SQLite/REST API)? → **Store JSON files per run** under `.crewlogs/` with helpers to aggregate.
3. Secrets management strategy for tool tokens (VS Code secret storage, env vars, or existing vault)? → **Default to VS Code secret storage** with optional `.env` fallback for CI until vault integration lands.

All decisions confirmed; Phase 1 scaffolding can begin.
