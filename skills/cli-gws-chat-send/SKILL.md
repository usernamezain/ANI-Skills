---
name: ai:gws-chat-send
description: "Google Chat: Send a message to a space."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws chat +send --help"
---

# chat +send

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

Send a message to a space

## Usage

```bash
gws chat +send --space <NAME> --text <TEXT>
```

## Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--space` | ✓ | — | Space name (e.g. spaces/AAAA...) |
| `--text` | ✓ | — | Message text (plain text) |

## Examples

```bash
gws chat +send --space spaces/AAAAxxxx --text 'Hello team!'
```

## Tips

- Use 'gws chat spaces list' to find space names.
- For cards or threaded replies, use the raw API instead.

> [!CAUTION]
> This is a **write** command — confirm with the user before executing.

## See Also

- [gws-shared](../gws-shared/SKILL.md) — Global flags and auth
- [gws-chat](../gws-chat/SKILL.md) — All manage chat spaces and messages commands


## When to Use
- Use this skill when the task involves `gws-chat-send` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-chat-send`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
