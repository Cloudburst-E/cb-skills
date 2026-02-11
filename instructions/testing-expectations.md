---
title: Testing Expectations for Cloudburst Frontend
---

Purpose
- Establish consistent expectations for unit, integration, and e2e tests across the monorepo so feature work has reliable, reviewable verification.

Test types & expectations
- Unit tests: fast, deterministic, cover component logic and props. Each component should have at least one unit test for primary behavior.
- Integration tests: component interactions (e.g., dropdown + form), DOM events, slot/content integration.
- Visual tests: Storybook stories + visual diffing for visual regressions on significant UI changes.
- E2E tests: cover critical user flows (auth, main funnels). Keep e2e surface small and stable.

Coverage targets (suggested)
- Package-level: aim for >= 60% by default; critical packages (design-tokens, core components) target >= 80%.

Conventions
- Put tests next to the component: `Component.test.ts` or `__tests__/Component.test.ts` as the package prefers.
- Use `vitest` (or repo standard) and the existing test utilities under `test_setup/`.
- Prefer explicit assertions over snapshot-only tests. Use snapshots for complex serialized output, but keep them reviewed and intentional.

CI notes
- Tests that fail in CI must be fixed or marked `flaky` with an issue and owner assigned.
- Visual diffs require an approval step — document expected visual changes in the PR when applicable.

Quick checklist for PRs
- Run unit tests for the affected package(s).
- Add/modify Storybook stories for visual review.
- Add tests for new behaviors and edge cases (happy & unhappy paths).
- If adding stateful behavior, include at least one integration test verifying interactions.

Examples & commands
- Run tests for a package:

```bash
pnpm -w test --filter packages/button
```

Add these docs to PR templates or the issue template to make testing expectations visible at intake.
