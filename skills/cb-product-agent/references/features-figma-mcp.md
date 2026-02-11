---
name: features-figma-mcp
description: Step-by-step guide for turning Figma nodes into production-ready Vue via MCP.
owner: cb-product-agent
---

# Figma MCP Intake (owned by `cb-product-agent`)

This guide keeps Figma → MCP → Vue loops deterministic so `cb-product-agent` can deliver clean specs and hand the right artifacts to engineering.

## 1. Prepare Inputs

- Figma node URLs with `node-id` query parameters.
- Variant/state list for each node (hover, focus, disabled, loading, error).
- Copy decks, pricing notes, or conditional logic spelled out in the task brief.
- Link to the owning ClickUp task so automation can sync context later.

## 2. Run MCP Export

```
Figma -> MCP
- Node ID(s): <id>
- Include hidden layers: true
- Include component metadata: true
- Include styles and tokens: true
```

Download the JSON payload and attach it to the ClickUp task or `docs/product/<feature>.md` so other agents can reuse it.

## 3. Summarize for Engineering

For each component:

- **Component name**: matches package naming convention.
- **Existing package?** If yes, jot prop/slot deltas; if no, flag as net-new.
- **Design tokens**: map each color/shadow/spacing to `packages/design-tokens/src/tokens.css` or list new tokens to add.
- **Typography**: reference `.cb-*` utility classes.
- **Interactions**: hover/focus/pressed behaviors, animation durations, error states.
- **Deps**: API hooks, Pinia stores, or other packages to touch.

Record open questions in the ClickUp task so ops can follow up quickly.

## 4. Roadmap & Docs

- Update the roadmap entry with scope, dependencies, and ops approvals.
- Attach MCP exports + UX notes to the product brief in `frontend/docs/`.
- If patterns are reusable, tell `cb-learning-agent` which skill reference to update.

## 5. Hand Off

Send engineering a concise summary:

```
Component: <name>
Package: @cloudburst-ui/<name>
Variants: [...]
States: [...]
Tokens to add: [...]
Questions: [...]
```

Confirm ops approval before engineering starts coding.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- Internal Figma MCP intake SOP (2026-02-11)
-->
