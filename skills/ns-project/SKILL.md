---
name: meta:project
description: "project lifecycle | milestones audits summary"
argument-hint: ""
allowed-tools:
  - Read
  - Skill
---

Route to the appropriate project / milestone skill based on the user's intent.
`plan-milestone-gaps` was deleted by #2790 — gap planning now happens
inline as part of `audit-milestone`'s output.

| User wants | Invoke |
|---|---|
| Start a new project | new-project |
| Create a new milestone | new-milestone |
| Complete the current milestone | complete-milestone |
| Audit a milestone for issues | audit-milestone |
| Summarize milestone status | milestone-summary |

Invoke the matched skill directly using the Skill tool.

