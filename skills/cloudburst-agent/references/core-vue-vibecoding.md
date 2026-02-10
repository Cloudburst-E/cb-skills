---
name: core-vue-vibecoding
description: Practical guide for composing Cloudburst Vue surfaces with existing packages, tokens, and tests
---

# Vue Vibecoding Playbook

Translate design intent into production-ready Vue by leaning on the Cloudburst component packages and design system. This guide assumes `<script setup lang="ts">` and the base Vue/Vite skills are already loaded.

## When to Add vs. Reuse

| Question | Reuse Existing Package | Create/Extend Package |
|----------|-----------------------|------------------------|
| Matches an existing component in `packages/*`? | Import via `@cloudburst-ui/<name>` and override via props/slots | Only extend if the delta is reusable elsewhere |
| Needs Vuetify primitives only? | Compose with Vuetify in the owning app | Wrap the pattern in a local package so other apps can share it |
| Requires shared tokens/logic? | Prefer exposing new props on the owning package | Scaffold a new workspace package via `pnpm run create <name>` |

## Implementation Steps

1. **Bootstrap context**
   - Import tokens with `@import '@cloudburst-ui/design-tokens/src/tokens.css';` inside component/style entry points when working outside the web app.
   - Register Vuetify via `test_setup/makeVuetify.ts` or the per-app plugin when running stories/tests.
2. **Wire script block**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { CbButtonVariant } from '@cloudburst-ui/button'

const props = defineProps<{ label: string; variant?: CbButtonVariant }>()
const emit = defineEmits<{ pressed: [] }>()

const { data: listings } = useQuery({
  queryKey: ['listings'],
  queryFn: fetchListings,
})

const headline = computed(() => `${props.label} · ${listings.value?.length ?? 0}`)
</script>

<template>
  <section class="cb-panel">
    <header>
      <cb-title :text="headline" size="md" />
      <cb-button :variant="props.variant ?? 'primary'" @click="emit('pressed')">Act</cb-button>
    </header>
  </section>
</template>

<style scoped>
.cb-panel {
  background: var(--cb-surface);
  color: var(--cb-on-surface);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.08);
}
</style>
```

3. **Respect tokens first**
   - Use semantic `--cb-*` CSS variables by default so packages remain framework-agnostic.
   - Fall back to Vuetify runtime values via `rgb(var(--v-theme-primary))` when you need Vuetify utilities (ripples, theme switching).
4. **State & data flow**
   - Prefer composables in `packages/utils` or new `useX` helpers colocated with the component package.
   - When sharing state across an app, expose a Pinia store from `apps/<app>/src/stores` and inject it via `app.provide`. Document the dependency inside the package README.
5. **Stories, tests, docs**
   - Add a Storybook story in the package to lock the contract. Use the `createPlatformStory` helper if applicable.
   - Mirror the story states as Vitest cases under `src/*.test.ts` with `@tests/makeVuetify`.
   - Update the owning skill reference if you invented a new pattern (slots, prop shapes, theming rule).

## Verification Checklist

- Component builds via `pnpm --filter @cloudburst-ui/<name> build`.
- Tests pass via `pnpm --filter @cloudburst-ui/<name> test` with tokens mocked when needed.
- Consumers re-run `pnpm devapp web` (or the target app) to confirm visual integration.
- Skill docs updated if the surface introduced reusable guidance.

<!--
Source references:
- https://github.com/rhouse-cloudburst/frontend/blob/main/README.md
-->
