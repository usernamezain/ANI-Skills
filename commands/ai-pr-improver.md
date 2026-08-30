# ai:pr-improver

Runs an autonomous review-and-fix improvement loop over the current branch's changes until a PR review comes back clean, scoped mechanically to the directories the branch touched. Reviews are performed by an installed PR-review skill (default: pr-review-toolkit's review-pr). Use to fix review findings on a branch before opening or updating a pull request ('clean up this branch', 'fix this PR until review passes', 'run review-and-fix on my changes'). NOT for a one-time review — run the PR-review skill directly.

**Skill folder:** `skills/skills-pr-improver/`
**Namespace:** `ai`
