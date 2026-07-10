---
name: skill:hyperexecute-skill
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
Trigger and execute the Antigravity skill: hyperexecute-skill.
Load the prompt instructions from skills/hyperexecute-skill/SKILL.md and consult the copy-pasteable references or guidelines inside skills/hyperexecute-skill/references/ to complete the task.
</objective>

<execution_context>
@skills/hyperexecute-skill/SKILL.md
</execution_context>
