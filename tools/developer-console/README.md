Developer Console (prototype)
=============================

This is a lightweight VS Code extension prototype that opens a webview to search and surface developer artifacts (GitHub PRs, issues). ClickUp connectors are provided as disabled stubs by default to avoid accidental writes to production accounts.

How to run (manual):

1. Open this workspace in VS Code.
2. Open the `cb-skills/tools/developer-console` folder as an extension workspace or run the `Run Extension` launch target.
3. Run the command `Developer Console: Open` from the command palette.

Notes:
- This is a prototype. Connectors return mock data unless provided with tokens.
- Enable ClickUp connector only after testing with a safe test token.
