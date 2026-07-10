---
name: quality
description: "quality gates | code review debug audit security eval ui"
argument-hint: ""
allowed-tools:
  - Read
  - Skill
requires: [code-review, audit-uat, secure-phase, eval-review, ui-review, validate-phase, debug, forensics]
---

Route to the appropriate quality / review skill based on the user's intent.
`code-review-fix` was absorbed by `code-review --fix` in #2790.

| User wants | Invoke |
|---|---|
| Review code for quality and correctness | code-review |
| Auto-fix code review findings | code-review --fix |
| Audit UAT / acceptance testing | audit-uat |
| Security review of a phase | secure-phase |
| Evaluate AI response quality | eval-review |
| Review UI for design and accessibility | ui-review |
| Validate phase outputs | validate-phase |
| Debug a failing feature or error | debug |
| Forensic investigation of a broken system | forensics |

Invoke the matched skill directly using the Skill tool.

