---
name: features-clickup-integrations
description: Playbook for integrating ClickUp, GitHub, and the Cloudburst agent queue.
owner:
  - cb-project-agent
  - cb-devops-agent
---

# ClickUp + GitHub Automation

Use this guide when wiring the project agent (and supporting automation scripts) into ClickUp and GitHub. It covers task schemas, API usage, and how to keep worklogs, release notes, and emails consistent.

## Task Schema

| Field | Type | Purpose |
|-------|------|---------|
| `agent_owner` | Dropdown (Product, Engineering, Ops, DevOps, Learning, Change) | Which specialist currently owns the task |
| `repo_path` | Text | Path to the file/package/app being changed (`frontend/packages/button`, `cb-skills/skills/cloudburst-agent/...`) |
| `skill_reference` | Text | Link to the relevant reference file |
| `status` | Status | Map to agent queue statuses (Backlog, In Progress, Review, Blocked, Done) |
| `due_date` | Date | Ops-set target date |
| `priority` | Dropdown (P0–P3) | Mirrors ops priority |
| `github_pr` | Text | PR URL or commit SHA |

## API Usage

1. **Authentication**: Use ClickUp personal tokens stored in secure env vars (e.g., `CLICKUP_TOKEN`). GitHub access uses PATs or GitHub App tokens (store separately).
2. **Wrapper Module**: Create `packages/utils-clickup/src/index.ts` (or similar) exporting helpers:
   - `createTask({ listId, title, description, fields })`
   - `updateTaskStatus(taskId, status)`
   - `addComment(taskId, markdown)`
   - `attachGithubLink(taskId, linkType, url)`
   - `listTasks({ filters })`
3. **Webhooks**: Configure ClickUp webhooks for `taskUpdated`, `taskCreated`, `commentPosted`. Point them to a lightweight API route (`/api/clickup/webhook`) that forwards events to `cb-project-agent` (or logs them for later consumption). Verify signatures per ClickUp docs.
4. **GitHub Hooks**: Subscribe to PR and workflow events. On completion, call `addComment` to inform the matching ClickUp task and update custom fields with status (Pass/Fail, run URL).

## Release Notes & Emails

1. Project agent drafts a ClickUp Doc daily summarizing:
   - Completed tasks (with PR links)
   - Skills/docs updated
   - Outstanding blockers and owners
2. DevOps uses the same data to send:
   - **Developer daily email**: Personalized summary (tasks touched, commands run, pending approvals).
   - **Team release note email**: High-level summary + instructions to pull new skills.
   - **Weekly executive report**: Stats (tasks completed, skill refs updated, releases shipped) + marketing-ready bullets.

## Implementation Tips

- Store list/folder IDs in `scripts/config/project-agent.json` to avoid hardcoding.
- Use batching when creating or updating tasks to avoid rate-limit spikes.
- Log all API interactions (success + error) through `cb-devops-agent` so telemetry captures automation health.
- Before merging, run integration tests (mock ClickUp responses) to ensure schema changes don’t break existing tasks.

<!--
Source references:
- clickup.com/api
- github.com docs/webhooks
- Cloudburst internal automation notes (2026-02-11)
-->
