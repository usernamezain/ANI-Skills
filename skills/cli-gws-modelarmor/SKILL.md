---
name: ai:gws-modelarmor
description: "Google Model Armor: Filter user-generated content for safety."
metadata:
  version: 0.22.5
  openclaw:
    category: "productivity"
    requires:
      bins:
        - gws
    cliHelp: "gws modelarmor --help"
---

# modelarmor (v1)

> **PREREQUISITE:** Read `../gws-shared/SKILL.md` for auth, global flags, and security rules. If missing, run `gws generate-skills` to create it.

```bash
gws modelarmor <resource> <method> [flags]
```

## Helper Commands

| Command | Description |
|---------|-------------|
| [`+sanitize-prompt`](../gws-modelarmor-sanitize-prompt/SKILL.md) | Sanitize a user prompt through a Model Armor template |
| [`+sanitize-response`](../gws-modelarmor-sanitize-response/SKILL.md) | Sanitize a model response through a Model Armor template |
| [`+create-template`](../gws-modelarmor-create-template/SKILL.md) | Create a new Model Armor template |

## Discovering Commands

Before calling any API method, inspect it:

```bash
# Browse resources and methods
gws modelarmor --help

# Inspect a method's required params, types, and defaults
gws schema modelarmor.<resource>.<method>
```

Use `gws schema` output to build your `--params` and `--json` flags.



## When to Use
- Use this skill when the task involves `gws-modelarmor` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `gws-modelarmor`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
