---
name: ai:upgrade
argument-hint: "<or just run '/notfair:upgrade'>"
description: >
  Upgrade the NotFair plugin to the latest version. Updates the marketplace repo,
  installs the new version to the plugin cache, and updates installed_plugins.json.
  Use when asked to "upgrade notfair", "update notfair", or "get latest version".
  Also handles inline upgrade prompts when a skill detects UPGRADE_AVAILABLE at startup.
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
---

# Canonical NotFair workflow

Read [`../../notfair-upgrade-skill/SKILL.md`](../../notfair-upgrade-skill/SKILL.md) completely, then follow it as the active workflow. Resolve every relative reference from that file against `../../notfair-upgrade-skill/`.


## When to Use
- Use this skill when the task involves `upgrade` workflows, tooling, or domain requirements from `nowork-studio/notfair-plugin`.
- Trigger on user keywords: `upgrade`, `notfair-plugin`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
