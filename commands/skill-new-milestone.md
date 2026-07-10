---
name: skill:new-milestone
description: Start a new milestone cycle — update PROJECT.md and route to requirements
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
Trigger and execute the Antigravity skill: new-milestone.
Load the prompt instructions from skills/new-milestone/SKILL.md and consult the copy-pasteable references or guidelines inside skills/new-milestone/references/ to complete the task.
</objective>

<execution_context>
@skills/new-milestone/SKILL.md
</execution_context>
