---
name: skill:quality
description: quality gates | code review debug audit security eval ui
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
Trigger and execute the Antigravity skill: quality.
Load the prompt instructions from skills/ns-review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ns-review/references/ to complete the task.
</objective>

<execution_context>
@skills/ns-review/SKILL.md
</execution_context>
