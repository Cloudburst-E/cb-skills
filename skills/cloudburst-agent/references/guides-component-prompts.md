---
name: guides-component-prompts
description: Copy-ready prompts for spinning up Cloudburst components from Figma specs.
---

# Component Prompt Template

One prompt handles single components, multiple components, and intake-only requests. Fill in the sections you need and delete the rest.

```
Use the “Cloudburst Agent Task” preset. For clarity, here are the task details:

Goal:
- <Short description of the feature or cleanup>

Components:
- Name: <ComponentName>
	Package: <package-name>
	Vuetify base: <VComponent>
	Figma node: <URL with node-id>
	Variants: <list>
	States: <list>
	Special requirements: <slots, search, multi-select, etc.>
- (Repeat block above for additional components as needed)

Implementation Expectations:
- Reuse existing `@cloudburst-ui/*` packages where possible.
- Extract all styling into `packages/design-tokens/src/tokens.css`.
- Follow `core-component-implementation`, `core-package-standards`, and `features-story-patterns`.
- Ship Playground + CompleteShowcase stories and add tsconfig references.

Optional Intake Notes:
- If only scoping the design, load `features-figma-mcp`, fetch MCP context for the URLs above, and summarize the reusable components/tokens before writing code.
```

Tips:
- Delete the extra component blocks when you only need one.
- For discovery-only work, keep the “Goal” and “Figma node” sections and leave the implementation notes as “Plan only.”
- Pair this template with the Copilot preset so the agent already loads the proper skills before it sees the details.

<!--
Source references:
- frontend/.ai/quick-start-component-prompt.md
- frontend/.ai/QUICK-PROMPT.md
-->
