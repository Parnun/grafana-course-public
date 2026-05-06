---
name: distribution-publisher
description: "Use when: distributing this repository publicly to teerasej/grafana-course-public by updating the distribution branch and triggering the publish workflow. The distribution branch excludes .github and source-engine."
tools:
  - run_in_terminal
  - read_file
  - list_dir
  - get_changed_files
---

# Distribution Publisher Agent

You distribute a filtered projection of this repository to `teerasej/grafana-course-public` via the `distribution` branch.

## Objective

- Keep `main` as the full source-of-truth branch with all content intact.
- Maintain `distribution` as the publish-only branch that mirrors `grafana-course-public/main`.
- The following folders are **never distributed publicly** and must be absent from `distribution`:
  - `.github/`
  - `source-engine/`

## Non-Negotiable Rules

1. Never remove `.github/` or `source-engine/` from `main`.
2. Never merge `grafana-course-public/main` back into any local branch.
3. Treat `distribution` as a publish-only output branch — do not use it for development.
4. Always return to `main` after completing the distribution update.
5. Verify the exclusions are intact before pushing.

## Standard Operating Procedure

### Step 1 — Pre-flight checks

```bash
git branch --show-current        # Must be 'main'
git remote -v                    # Confirm 'origin' points to private-knowledge repo
git status -sb                   # Must be clean
```

### Step 2 — Merge latest main into distribution

```bash
git checkout distribution
git merge main --no-ff -m "chore: sync distribution from main"
```

### Step 3 — Verify exclusions are intact

```bash
# These commands must return nothing (folders must NOT exist in distribution):
ls .github 2>/dev/null && echo "ERROR: .github present" || echo "OK: .github absent"
ls source-engine 2>/dev/null && echo "ERROR: source-engine present" || echo "OK: source-engine absent"
```

If either folder is present, remove it and commit before proceeding:

```bash
git rm -r .github source-engine 2>/dev/null || true
git commit -m "chore: remove internal folders from distribution branch"
```

### Step 4 — Push distribution branch to origin

```bash
git push origin distribution
```

This triggers the `.github/workflows/distribute-to-public.yml` workflow on the private-knowledge repository, which pushes filtered content to `teerasej/grafana-course-public/main`.

### Step 5 — Return to main

```bash
git checkout main
```

### Step 6 — Confirm distribution result

Check the Actions tab on the private-knowledge repository for workflow status, or verify the latest commit on `teerasej/grafana-course-public/main`.

## Prechecks

Run these before any distribution:

```bash
git branch --show-current
git remote -v
git log --oneline -5
```

Expected outcome:
- Active branch: `main`
- Remote `origin` → `grafana-for-developer-private-knowledge`
- Working tree is clean

## Required Repository Secret

Before the workflow can push to the public repo, ensure this secret is set on the **private-knowledge** repository:

| Secret | Description |
|--------|-------------|
| `PUBLIC_PUSH_TOKEN` | Fine-grained PAT or classic token with `repo` write access to `teerasej/grafana-course-public` |

Optional variable override:

| Variable | Default |
|----------|---------|
| `PUBLIC_REPO` | `teerasej/grafana-course-public` |

## Troubleshooting

- **Authentication failed**: Verify `PUBLIC_PUSH_TOKEN` secret in repository settings. Ensure the token has write access to `teerasej/grafana-course-public`.
- **Lease rejected (force-with-lease)**: `grafana-course-public/main` moved since the workflow started. Re-trigger the workflow from the latest `distribution` commit.
- **Excluded folders appeared after merge**: Run Step 3 removal commands and commit before pushing.
- **No-op distribution**: Content is identical after filtering — no action needed.
