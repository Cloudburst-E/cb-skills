---
title: Figma / MCP Intake Conventions
---

Purpose
- Provide a compact, machine- and human-friendly intake template for features driven from Figma/MCP so implementations are consistent and reviewable.

Required intake fields (short template)

```yaml
title: "Short feature title"
figma_url: "https://www.figma.com/file/:fileKey/...?node-id=1:2"
figma_fileKey: ":fileKey"
figma_node_id: "1:2"
mcp: true
target_package: "packages/button"
priority: "P2"
owner: "@githubHandle"
acceptance_criteria:
  - "Behavioral criteria in plain sentences"
  - "Accessibility expectations (WCAG)"
tests:
  unit: true
  storybook: true
  visual_regression: optional
  e2e: optional
assets: ["png/svg exports if needed"]
branch_name: "feat/button/ghost-secondary"
estimated_effort: "1d"
reviewers: ["@alice","@bob"]
```

Conventions / Guidance
- Always include a `figma_url`, `figma_fileKey`, and `figma_node_id` when the change is visual.
- Map the Figma node to a Code Connect mapping if available. Add the mapping to the PR description.
- Target a single package whenever possible. Cross-package changes must list all impacted packages in `target_package`.
- Acceptance criteria should be testable — prefer concrete examples and edge cases.
- Include explicit accessibility checks (keyboard nav, focus states, ARIA roles).

Review checklist (developer)
- Confirm design tokens used (colors/spacing/typography) and reference packages/design-tokens.
- Implement component stories in Storybook and link them in PR.
- Add unit tests covering core behavior and edge cases.
- Run `pnpm -w test --filter <package>` (or the repo's test command) for the target package and ensure CI passes.
- If visuals change, include a visual diff via Percy/Chromatic or add screenshots and note if visual regression approval is required.

Where to put intake
- Add the filled YAML block to the PR description and to the issue body. Also attach the Figma link and a short summary in the PR title.

Example PR description snippet

```
Feature: Ghost secondary button

Intake:
<paste YAML template>

Design: https://www.figma.com/file/...

Acceptance: ...
```
