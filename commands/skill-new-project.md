---
name: skill:new-project
description: Initialize a new project with deep context gathering and PROJECT.md
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
Trigger and execute the Antigravity skill: new-project.
Load the prompt instructions from skills/new-project/SKILL.md and consult the copy-pasteable references or guidelines inside skills/new-project/references/ to complete the task.
</objective>

<execution_context>
@skills/new-project/SKILL.md
</execution_context>
