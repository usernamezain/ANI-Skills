---
name: skill:nemojs-skill
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
Trigger and execute the Antigravity skill: nemojs-skill.
Load the prompt instructions from skills/nemojs-skill/SKILL.md and consult the copy-pasteable references or guidelines inside skills/nemojs-skill/references/ to complete the task.
</objective>

<execution_context>
@skills/nemojs-skill/SKILL.md
</execution_context>
