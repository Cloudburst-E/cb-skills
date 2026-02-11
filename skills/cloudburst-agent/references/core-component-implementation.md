---
name: core-component-implementation
description: End-to-end instructions for building Cloudburst Vue components from Figma with Vuetify, tokens, and tests.
owner: cb-engineering-agent
---

# Component Implementation Blueprint (executed by `cb-engineering-agent`)

Use this when building or reviewing any first-class Cloudburst component (the packages without the `cb-` prefix). It condenses the `.ai` implementation docs into one agent-friendly reference.

## 1. Plan Before You Scaffold

- **Reuse first**: Scan `packages/` for components you can compose (buttons, breadcrumb, text-field, dropdown, etc.). Import `@cloudburst-ui/*` packages before rebuilding primitives.
- **Name correctly**:
  - Full-featured component → `packages/component-name/` with `ComponentName.vue`, exported as `@cloudburst-ui/component-name`.
  - Legacy wrappers used the `cb-` prefix and have been removed. Do not reintroduce `@cloudburst-ui/cb-*` packages; promote every component to a first-class `@cloudburst-ui/*` module with real sources under `packages/<name>/`.
- **Figma sweep**: For every state/variant gather width, padding, border, background, shadow, typography usage, and interactions. Confirm screenshots cover active, hover, focus, disabled, error, loading, etc.

## 2. Design Tokens First

- No hardcoded colors, gradients, shadows, spacings, or radii inside components.
- Extend `packages/design-tokens/src/tokens.css` using `--cb-{component}-{variant}-{property}`.
- Document hover/focus/error tokens separately; map gradient angles and multiple shadows explicitly.

## 3. Implementation Rules

### Script & Template

- `<script setup lang="ts">` only; prefer TypeScript generics where helpful.
- Define props + emits + slots up front. Computed classes follow the array pattern:

```ts
const classes = computed(() => [
  "cb-component",
  props.variant && `cb-component-${props.variant}`,
  props.state && `cb-component-${props.state}`,
].filter(Boolean))
```

- Import order: Node (`node:path`), external, then internal workspaces. Double quotes everywhere.
- Base everything on Vuetify primitives (VBtn, VCheckbox, VSelect, etc.) or compose existing packages.

### Styles

- `<style scoped lang="scss">`; BEM-ish naming (`.cb-component`, `.cb-component__element`).
- Leverage tokens: `background: var(--cb-component-primary-surface);`.
- Typography lives in templates via global classes (`.cb-label-2`, `.cb-body-1`, `.cb-body-2`, `.cb-h*`). Never declare `font-family`, `font-size`, `line-height`, or `letter-spacing` inside scoped styles.
- Transitions use `.cb-transition` utility on the Vuetify root. Never declare `transition:` manually.
- Border syntax is single-line: `border: 1px solid var(--cb-component-border);`.

### File Layout

```
packages/component-name/
  package.json
  test-setup-wrapper.ts
  tsconfig.json
  tsconfig.vite.json
  vite.config.ts
  vitest.config.ts
  src/
    ComponentName.vue
    ComponentName.stories.ts
    ComponentName.test.ts
    index.ts
    index.test.ts
```

Use `pnpm run create <name>` only if you truly need scaffolding; otherwise mirror an existing package (e.g., `packages/breadcrumbs`).

## 4. Storybook Pattern

- Always emit exactly two stories per component: `Playground` (interactive controls) and `CompleteShowcase` (all variants/states, controls disabled).
- For form components, never expose `modelValue` as a control. Use a `ref` with `v-model` inside the story’s `render` function.
- Arrays need helper controls like `itemCount` plus computed data in `setup()` so authors can add/remove entries at runtime.
- Icons rely on helper props such as `selectedIcon` that map to Vuetify `VIcon` instances.

## 5. Testing

- Mount using `@cloudburst-ui/test-helpers` and `test_setup/makeVuetify.ts`.
- Cover emits, variant/state classes, tokens, and any helper composables.
- Keep snapshots minimal; prefer explicit assertions.

## 6. Final Checklist

- Tokens added and referenced.
- Typography/transition utilities used instead of hard-coded values.
- Package references added to `tsconfig.base.json`.
- Stories follow Playground + CompleteShowcase.
- `pnpm --filter @cloudburst-ui/<name> build` and `test` succeed.
- Documented any new workflow insights in the appropriate skill reference.

<!--
Source references:
- frontend/.ai/component-implementation-prompt.md
-->
