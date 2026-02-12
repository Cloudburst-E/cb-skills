# anthropics/frontend-design — Consultative Integration

This document outlines how to use the `anthropics/frontend-design` skill as a consultative tool in our agentic workflow. The skill is treated as an ideation/consultant resource only — never a source-of-truth.

Install (sandbox branch):

```bash
git checkout -b try-anthropics-frontend-design
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Usage rules (consult-only):
- Always run the skill in an `experimental/` folder or branch.
- Map any suggested tokens/values to our canonical `design-tokens` before applying.
- Require a human reviewer to convert suggestions into canonical components.
- Block auto-commits of generated UI into `packages/*` without a manual adapter+review.

Suggested integration points:
- When no Figma reference exists for a new pattern, solicit variant recommendations from the skill.
- Use for accessibility / edge-case checklists, naming suggestions, or responsive-state ideas.
- Use to seed PR descriptions with rationale and testing suggestions.

CI & gating recommendations:
- Add a token-lint step that fails if new hard-coded values appear (colors, spacing, fonts).
- Run Storybook visual snapshots against the experimental output; require manual approval to accept baselines.

Example prompts (copy into `experimental/prompts.md` before running):
- "Provide 3 accessible variants for a primary `button` that reuse existing spacing and color tokens."
- "List ARIA attributes and responsive states for a compact `card` component with avatar and actions."

Next steps for a pilot:
1. Create a `try-anthropics-frontend-design` branch.
2. Add the skill locally and run a single consult session for `packages/button`.
3. Store output in `integrations/frontend-design/experimental/` and run Storybook + token-lint.
4. Review results and decide whether to keep the skill installed and formalize the adapter.

Guiding principle: the skill should expand our agent knowledge and ideation surface, not replace Figma or our tokens.
