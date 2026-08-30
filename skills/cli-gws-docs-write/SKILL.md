---
name: ai:gws-docs-write
description: "Google Docs: Append text to a document."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws docs +write --help"
---

# docs +write

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

Append text to a document

## Usage

```bash
gws docs +write --document <ID> --text <TEXT>
```

## Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--document` | ✓ | — | Document ID |
| `--text` | ✓ | — | Text to append (plain text) |

## Examples

```bash
gws docs +write --document DOC_ID --text 'Hello, world!'
```

## Tips

- Text is inserted at the end of the document body.
- For rich formatting, use the raw batchUpdate API instead.

> [!CAUTION]
> This is a **write** command — confirm with the user before executing.

## See Also

- [gws-shared](../gws-shared/SKILL.md) — Global flags and auth
- [gws-docs](../gws-docs/SKILL.md) — All read and write google docs commands


## When to Use
- Use this skill when the task involves `gws-docs-write` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-docs-write`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
