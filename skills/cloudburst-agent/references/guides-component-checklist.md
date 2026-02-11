---
name: guides-component-checklist
description: Review checklist for Cloudburst components before accepting AI/generated changes.
owner: cb-engineering-agent
---

# Component Review Checklist (run by `cb-engineering-agent`)

Run through this list before merging any component work.

## Intake & Naming

- [ ] Figma link(s) captured for every state/variant.
- [ ] Component/package names follow the non-`cb-` convention unless it’s a thin wrapper.
- [ ] Vuetify base component identified.

## Package Structure

- [ ] Located under `packages/<name>/` with the standard config files (package.json, tsconfigs, vite/vitest config, test-setup-wrapper).
- [ ] Added to `tsconfig.base.json` references.
- [ ] `src/` contains `ComponentName.vue`, `.stories.ts`, `.test.ts`, `index.ts`, and `index.test.ts`.

## Design Tokens

- [ ] Needed colors, gradients, shadows added to `packages/design-tokens/src/tokens.css`.
- [ ] Token naming follows `--cb-component-variant-property`.
- [ ] No hardcoded colors/gradients/shadows inside component styles.

## Implementation

- [ ] `<script setup lang="ts">` with typed props/emits.
- [ ] Computed classes follow the array pattern.
- [ ] Template composes Vuetify primitives or other `@cloudburst-ui/*` packages.
- [ ] Styles rely on tokens, `.cb-transition`, and typography utility classes; no hardcoded font or transition values.
- [ ] Borders declared as `border: 1px solid var(--cb-token);`.

## Stories

- [ ] Exactly two stories: `Playground` (interactive) and `CompleteShowcase` (controls disabled).
- [ ] Form components use `ref` + `v-model` instead of exposing `modelValue` controls.
- [ ] Array props use helper controls (e.g., `itemCount`) rather than Storybook’s broken object editor.
- [ ] Section headers inside `CompleteShowcase` use `<h3 class="cb-h4">` and describe the content.

## Tests

- [ ] Component mounts and basic rendering covered.
- [ ] Emits/interaction logic tested.
- [ ] Themes/tokens validated (e.g., classes applied, props forwarded).
- [ ] Suite runs via `pnpm --filter @cloudburst-ui/<name> test`.

## Code Quality

- [ ] Biome formatting (double quotes, import order, arrow style).
- [ ] No `any` types.
- [ ] Props/emits documented via TypeScript.

## Integration

- [ ] Package builds (`pnpm --filter @cloudburst-ui/<name> build`).
- [ ] Storybook renders states without console errors.
- [ ] New prompts or learnings captured in skill references if applicable.

Common red flags: hardcoded typography or transitions, exposing `modelValue` as a control, missing tokens, broken Storybook controls, missing test helper imports. Escalate unresolved disagreements about scope or UX to `cb-ops-agent`.

<!--
Source references:
- frontend/.ai/component-checklist.md
-->
