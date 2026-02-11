---
name: features-figma-mcp
description: Figma MCP import workflow for translating design nodes into Cloudburst-ready Vue code
owner:
   - cb-product-agent
   - cb-engineering-agent
---

# Figma MCP Intake → Production Code

`cb-product-agent` leads discovery (personas, UX heuristics) while `cb-engineering-agent` converts approved layouts into reusable Vue packages. Use this doc when both agents need a shared blueprint.

Figma mockups capture intent quickly but rarely match the structure we ship. Use this workflow to translate MCP imports into maintainable Vue that reuses our design tokens and packages.

## Tooling Overview

| Tool | Purpose |
|------|---------|
| `mcp_figma_get_design_context` | Pull node metadata + Code Connect hints for layout/props. |
| `mcp_figma_get_screenshot` | Snapshot for quick visual diffs when refining styles. |
| `mcp_figma_get_variable_defs` | Retrieve color/spacing tokens to map back to `--cb-*`. |
| `skills/cloudburst-agent` | Reminds the agent how to restructure layers into real components. |

## Workflow

1. **Select the node** in Figma that represents the atomic unit we plan to build (component, section, or page shell). Avoid exporting entire pages unless the change truly spans the whole screen.
2. **Fetch design context** via MCP and inspect:
   - Layer tree → map high-level containers to existing packages (`@cloudburst-ui/card`, `@cloudburst-ui/tag`, etc.).
   - Text styles → convert to typography tokens (`--cb-title-md`, `--cb-body-sm`).
   - Color variables → translate Figma tokens to `packages/design-tokens` semantics. Document any mismatch.
3. **Decide on a build path**:
   - **Reuse**: Compose existing components and override via props/slots.
   - **Extend**: Add props/variants to a package when the change benefits multiple surfaces.
   - **New**: Scaffold a component package only if the layout is unique and reusable.
4. **Normalize layout**:
   - Replace absolute positioning with CSS Grid/Flex using our spacing scale (`var(--cb-spacing-*)`).
   - Compress repeated primitives into loops/arrays rather than copy-paste markup.
   - Encode variant logic (hover, active, statuses) as props instead of duplicated frames.
5. **Ground in tokens**:
   - Colors: `background: var(--cb-surface-elevated);` rather than raw HEX from Figma.
   - Typography: map to `packages/typography` utilities or the `<Title>` component variants.
   - Spacing/radius: use the design tokens or existing utility classes.
6. **Validate interactions**:
   - Tie CTA buttons to actual emits or navigation events.
   - Ensure focus/keyboard states exist even if the Figma frame omits them.
7. **Ship with proofs**:
   - Storybook story documenting the Figma reference screenshot + notes.
   - Vitest snapshot/state coverage for the new props/variants.
   - Update `guides-prompt-kit.md` with any new prompt snippet discovered while mapping the node.

## Mapping Checklist

- [ ] Every visual token ties back to `packages/design-tokens`.
- [ ] Component tree reuses or extends `@cloudburst-ui/*` packages.
- [ ] Data/state requirements captured in composables or Pinia.
- [ ] Interaction, accessibility, and responsive behaviors defined (not implied by Figma).
- [ ] Changes documented in skills so future imports follow the same recipe.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
- https://figma.com (general MCP context)
-->
