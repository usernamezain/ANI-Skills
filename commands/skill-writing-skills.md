---
name: skill:writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment
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
Trigger and execute the Antigravity skill: writing-skills.
Load the prompt instructions from skills/writing-skills/SKILL.md and consult the copy-pasteable references or guidelines inside skills/writing-skills/references/ to complete the task.
</objective>

<execution_context>
@skills/writing-skills/SKILL.md
</execution_context>
