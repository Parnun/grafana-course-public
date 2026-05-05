# Publishing Model

This repository uses a dual-remote workflow:

- `private-knowledge` is the source-of-truth repository and keeps all files.
- `origin` is a filtered distribution repository.

## Filtering Rules

When publishing to `origin/main`, these paths are excluded:

- `.github/`
- `source-engine/`

All other tracked files are published.

## Automation

Workflow file: `.github/workflows/publish-origin-filtered.yml`

Trigger conditions:

- push to `main`
- manual trigger via `workflow_dispatch`

Publish behavior:

1. Check out current `main` commit.
2. Build a filtered workspace excluding `.github` and `source-engine`.
3. Create one squashed publish commit from filtered content.
4. Push to `origin/main` using lease-protected force update.
5. Skip push if filtered content tree is unchanged.

## Required Configuration

Configure these in the `private-knowledge` repository where the workflow runs.

1. Repository secret: `ORIGIN_PUSH_TOKEN`
2. Repository variable (optional): `ORIGIN_REPO`

Default for `ORIGIN_REPO` is:

- `teerasej/grafana-for-developer-origin`

### Token permissions

Use a fine-grained PAT or deploy credential with write access to the target origin repository.

Minimum required capability:

- contents: write (target origin repository)

## Operational Rules

1. Do not merge `origin/main` back into `private-knowledge/main`.
2. Do not edit `origin/main` directly by hand.
3. Treat `origin/main` as publish output only.
4. Keep normal development on `private-knowledge/main`.

## Validation Checklist

After enabling automation, run these checks:

1. Positive test:
   - change a file under `Exercises/`
   - push `main`
   - confirm `origin/main` updates
2. Exclusion-only test:
   - change only `.github/` or `source-engine/`
   - push `main`
   - confirm workflow reports no-op or no effective content change
3. Mixed test:
   - change both `Exercises/` and `source-engine/`
   - push `main`
   - confirm `origin/main` reflects only allowed paths

## Rollback Procedure

If publish output is wrong:

1. Identify last known good source SHA in `private-knowledge/main`.
2. Re-run workflow from that commit.
3. Confirm filtered tree in `origin/main`.

## Agent Skill

Use `.github/agents/origin-publisher.agent.md` when running agent-assisted publishing tasks. The agent enforces prechecks, filtering intent, and troubleshooting flow.
