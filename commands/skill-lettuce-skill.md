---
name: skill:lettuce-skill
description: >
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
Trigger and execute the Antigravity skill: lettuce-skill.
Load the prompt instructions from skills/lettuce-skill/SKILL.md and consult the copy-pasteable references or guidelines inside skills/lettuce-skill/references/ to complete the task.
</objective>

<execution_context>
@skills/lettuce-skill/SKILL.md
</execution_context>
