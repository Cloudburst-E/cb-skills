# Playwright screenshots — Integration guide

Goal: generate consistent screenshots for release notes, PRs, and docs using our existing Playwright tooling (no new browser-agent dependency).

Principles:
- Reuse Playwright / existing test fixtures to avoid duplicated maintenance.
- Output artifacts to a deterministic location with metadata (commit, branch, PR, job id).
- Attach screenshots to releases or include links in PR comments from CI.

Files in this folder:
- `screenshot-capture.js` — tiny runner that loads a list of pages and saves screenshots.
- `pages.example.json` — example list of pages/iframes to capture.
- `ci-capture-example.yml` — GitHub Actions example to run captures and attach images to a release or upload artifacts.

Recommended workflow options:
- Release flow: run this job during the `release` workflow, upload images as release assets using `actions/upload-release-asset`.
- PR flow: run on demand in a PR (manual workflow or `workflow_dispatch`), upload as artifacts, and post a PR comment pointing reviewers to the workflow run/artifacts URL.

Security: run in CI with limited permissions. If capturing authenticated flows, use short-lived test accounts and inject secrets only in protected branches.

Next steps:
1. Add Playwright as a dev-dependency if not present: `pnpm add -D playwright`.
2. Add a small `script` entry in `package.json` that runs `node integrations/playwright-screenshots/screenshot-capture.js pages.json`.
3. Wire `ci-capture-example.yml` into `.github/workflows/` or copy into repo CI as needed.
