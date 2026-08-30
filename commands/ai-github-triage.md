# ai:github-triage

Triages a repository's open GitHub issues and pull requests via the gh CLI. Optionally reviews and merges ready PRs — incrementally merging passing automated/bot PRs and maintainer-approved ones, and spawning review subagents for never-reviewed ones — then closes already-resolved issues with comments citing the resolving PR or commit, cross-links issues with their pending fix PRs, and assigns local-only priority and change-size estimates for everything outstanding. Use when triaging, grooming, or reviewing a repository's open issues and PRs.

**Skill folder:** `skills/skills-github-triage/`
**Namespace:** `ai`
