---
name: ai:gws-gmail-triage
description: "Gmail: Show unread inbox summary (sender, subject, date)."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws gmail +triage --help"
---

# gmail +triage

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

Show unread inbox summary (sender, subject, date)

## Usage

```bash
gws gmail +triage
```

## Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--max` | — | 20 | Maximum messages to show (default: 20) |
| `--query` | — | — | Gmail search query (default: is:unread) |
| `--labels` | — | — | Include label names in output |

## Examples

```bash
gws gmail +triage
gws gmail +triage --max 5 --query 'from:boss'
gws gmail +triage --format json | jq '.[].subject'
gws gmail +triage --labels
```

## Tips

- Read-only — never modifies your mailbox.
- Defaults to table output format.

## See Also

- [gws-shared](../gws-shared/SKILL.md) — Global flags and auth
- [gws-gmail](../gws-gmail/SKILL.md) — All send, read, and manage email commands


## When to Use
- Use this skill when the task involves `gws-gmail-triage` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-gmail-triage`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
