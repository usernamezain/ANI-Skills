---
name: ai:gws-workflow-meeting-prep
description: "Google Workflow: Prepare for your next meeting: agenda, attendees, and linked docs."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws workflow +meeting-prep --help"
---

# workflow +meeting-prep

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

Prepare for your next meeting: agenda, attendees, and linked docs

## Usage

```bash
gws workflow +meeting-prep
```

## Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--calendar` | — | primary | Calendar ID (default: primary) |
| `--format` | — | — | Output format: json (default), table, yaml, csv |

## Examples

```bash
gws workflow +meeting-prep
gws workflow +meeting-prep --calendar Work
```

## Tips

- Read-only — never modifies data.
- Shows the next upcoming event with attendees and description.

## See Also

- [gws-shared](../gws-shared/SKILL.md) — Global flags and auth
- [gws-workflow](../gws-workflow/SKILL.md) — All cross-service productivity workflows commands


## When to Use
- Use this skill when the task involves `gws-workflow-meeting-prep` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-workflow-meeting-prep`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
