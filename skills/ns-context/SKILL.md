---
name: context
description: "codebase intelligence | map graphify docs learnings"
argument-hint: ""
allowed-tools:
  - Read
  - Skill
requires: [map-codebase, graphify, docs-update, extract-learnings]
---

Route to the appropriate codebase-intelligence skill based on the user's intent.
`scan` and `intel` were folded into `map-codebase` flags by #2790.

| User wants | Invoke |
|---|---|
| Map the full codebase structure | map-codebase |
| Quick lightweight codebase scan | map-codebase --fast |
| Query mapped intelligence files | map-codebase --query |
| Generate a knowledge graph | graphify |
| Update project documentation | docs-update |
| Extract learnings from a completed phase | extract-learnings |

Invoke the matched skill directly using the Skill tool.

