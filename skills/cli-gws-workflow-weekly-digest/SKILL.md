---
name: ai:gws-workflow-weekly-digest
description: "Google Workflow: Weekly summary: this week's meetings + unread email count."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws workflow +weekly-digest --help"
---

# workflow +weekly-digest

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

Weekly summary: this week's meetings + unread email count

## Usage

```bash
gws workflow +weekly-digest
```

## Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--format` | — | — | Output format: json (default), table, yaml, csv |

## Examples

```bash
gws workflow +weekly-digest
gws workflow +weekly-digest --format table
```

## Tips

- Read-only — never modifies data.
- Combines calendar agenda (week) with gmail triage summary.

## See Also

- [gws-shared](../gws-shared/SKILL.md) — Global flags and auth
- [gws-workflow](../gws-workflow/SKILL.md) — All cross-service productivity workflows commands


## When to Use
- Use this skill when the task involves `gws-workflow-weekly-digest` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-workflow-weekly-digest`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
