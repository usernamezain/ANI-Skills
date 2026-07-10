---
name: skill:workflow
description: workflow | discuss plan execute verify phase progress
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
Trigger and execute the Antigravity skill: workflow.
Load the prompt instructions from skills/ns-workflow/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ns-workflow/references/ to complete the task.
</objective>

<execution_context>
@skills/ns-workflow/SKILL.md
</execution_context>
