---
name: core-package-standards
description: Standard package structure, dependencies, and naming rules for Cloudburst UI components.
---

# Package & Formatting Standards

Apply these rules whenever you add or audit a package under `packages/`.

## 1. Formatting & Imports

- Biome controls formatting: 2 spaces, 120 columns, double quotes, no dangling commas on single-line objects.
- Node built-ins use the `node:` prefix and appear before external imports.
- Use `pnpm -w format:fix` and `pnpm -w check` before committing.
- `!important` is only tolerated in shared CSS overrides (configured in `biome.json`).

## 2. Naming & Folder Conventions

| Component Type | Directory | Vue Export | Package Name |
|----------------|-----------|------------|---------------|
| Full feature | `packages/button/` | `Button.vue` | `@cloudburst-ui/button` |
| Wrapper/adapter | `packages/cb-button/` | `index.ts` export | `@cloudburst-ui/cb-button` |

Rules:
- Use lowercase directories, PascalCase Vue filenames, and camelCase npm package scopes.
- Reserve the `cb-` prefix for thin wrappers over Vuetify primitives. Anything with real behavior belongs to a non-prefixed package.

## 3. Required Files

```
packages/<name>/
  package.json
  test-setup-wrapper.ts (imports vuetify styles + test setup)
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

`test-setup-wrapper.ts` standard content:

```ts
import "vuetify/styles"
import "../../test_setup/setupTests.ts"
```

## 4. package.json Template

```json
{
  "name": "@cloudburst-ui/<package-name>",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "files": ["dist"],
  "main": "./src/index.ts",
  "scripts": {
    "dev": "vite build --watch --config vite.config.ts",
    "build": "vite build --config vite.config.ts",
    "clean": "rimraf dist",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "peerDependencies": {
    "vue": "^3.5.21",
    "vuetify": "^3.9.1",
    "vue-router": "^4.0.0"
  },
  "devDependencies": {
    "@cloudburst-ui/test-helpers": "workspace:*",
    "@cloudburst-ui/theme-overrides": "workspace:*",
    "@cloudburst-ui/vite-config": "workspace:*",
    "@types/node": "^20.14.8",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/test-utils": "^2.4.0",
    "flush-promises": "^1.0.2",
    "jsdom": "^26.1.0",
    "rimraf": "^6.0.1",
    "typescript": "^5.4.0",
    "vite": "^7.1.4",
    "vitest": "^3.2.4",
    "vue": "^3.5.21",
    "vuetify": "^3.9.7",
    "vue-router": "^4.0.0"
  }
}
```

Keep peer deps lean and rely on workspace `workspace:*` references for internal packages.

## 5. Typography & Transition Utilities

- Typography: `.cb-label-2`, `.cb-body-1`, `.cb-body-2`, `.cb-h*`, `.cb-button-*` from `packages/theme-overrides/src/theme-overrides.css`.
- Transitions: `.cb-transition` for buttons, inputs, tags—no manual `transition:` declarations.
- Any scoped CSS that redefines `font-family`, `font-size`, `line-height`, `letter-spacing`, or `text-transform` fails review.

## 6. Creating Packages

Use the TypeScript helper scripts to stay consistent:

```bash
pnpm exec tsx scripts/create-package.ts component-name --vuetify
```

or for a simple wrapper (omit `--vuetify`). Scripts add TS references and dependencies automatically.

## 7. Auditing & Maintenance

- `scripts/templates/package/` is the canonical template—update it first, then sync existing packages.
- Use `grep` to ensure dependency versions stay aligned, e.g. `rg '"vitest"' packages/**/package.json`.
- Reference implementation: `packages/breadcrumbs/package.json`.

<!--
Source references:
- frontend/.ai/package-standards.md
-->
