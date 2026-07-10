---
name: skill:testunit-skill
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
Trigger and execute the Antigravity skill: testunit-skill.
Load the prompt instructions from skills/testunit-skill/SKILL.md and consult the copy-pasteable references or guidelines inside skills/testunit-skill/references/ to complete the task.
</objective>

<execution_context>
@skills/testunit-skill/SKILL.md
</execution_context>
