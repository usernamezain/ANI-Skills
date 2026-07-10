---
name: skill:audit-uat
description: Cross-phase audit of all outstanding UAT and verification items
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---
<objective>
Trigger and execute the Antigravity skill: audit-uat.
Load the prompt instructions from skills/audit-uat/SKILL.md and consult the copy-pasteable references or guidelines inside skills/audit-uat/references/ to complete the task.
</objective>

<execution_context>
@skills/audit-uat/SKILL.md
</execution_context>
