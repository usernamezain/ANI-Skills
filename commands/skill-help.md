---
name: skill:help
description: Show available antigravity commands and usage guide
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
Trigger and execute the Antigravity skill: help.
Load the prompt instructions from skills/help/SKILL.md and consult the copy-pasteable references or guidelines inside skills/help/references/ to complete the task.
</objective>

<execution_context>
@skills/help/SKILL.md
</execution_context>
