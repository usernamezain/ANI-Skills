---
name: skill:complete-milestone
description: Archive completed milestone and prepare for next version
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
Trigger and execute the Antigravity skill: complete-milestone.
Load the prompt instructions from skills/complete-milestone/SKILL.md and consult the copy-pasteable references or guidelines inside skills/complete-milestone/references/ to complete the task.
</objective>

<execution_context>
@skills/complete-milestone/SKILL.md
</execution_context>
