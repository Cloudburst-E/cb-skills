---
name: response-format
description: Standard response template for Cloudburst agent replies.
---

# Response Format

Use this concise pattern for all assistant replies to keep them scannable and consistent.

1. Executive summary (1–2 lines)
   - The short answer or outcome.

2. Technical details (collapsible)
   - Background and rationale
   - Files touched (list with links)
   - Commands to run (fenced)
   - Related links: PRs, ClickUp tickets, CI runs

Example markdown snippet:

<details>
<summary><strong>Executive summary</strong></summary>

- Implemented X; short outcome.

</details>

<details>
<summary><strong>Technical details</strong></summary>

- Background and rationale
- Files changed: [SKILL.md](../SKILL.md)
- Commands:

```bash
pnpm install
pnpm run test
```

- Links: PR / ticket / CI

</details>

Use this in templates and webview copy actions so developers can paste consistent replies into PR comments or ClickUp tasks.
