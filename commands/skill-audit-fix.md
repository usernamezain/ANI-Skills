---
name: skill:audit-fix
description: Autonomous audit-to-fix pipeline — find issues, classify, fix, test, commit
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
Trigger and execute the Antigravity skill: audit-fix.
Load the prompt instructions from skills/audit-fix/SKILL.md and consult the copy-pasteable references or guidelines inside skills/audit-fix/references/ to complete the task.
</objective>

<execution_context>
@skills/audit-fix/SKILL.md
</execution_context>
