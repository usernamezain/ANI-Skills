---
name: skill:audit-milestone
description: Audit milestone completion against original intent before archiving
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
Trigger and execute the Antigravity skill: audit-milestone.
Load the prompt instructions from skills/audit-milestone/SKILL.md and consult the copy-pasteable references or guidelines inside skills/audit-milestone/references/ to complete the task.
</objective>

<execution_context>
@skills/audit-milestone/SKILL.md
</execution_context>
