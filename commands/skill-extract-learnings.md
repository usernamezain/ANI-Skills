---
name: skill:extract-learnings
description: Extract decisions, lessons, patterns, and surprises from completed phase artifacts
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
Trigger and execute the Antigravity skill: extract-learnings.
Load the prompt instructions from skills/extract-learnings/SKILL.md and consult the copy-pasteable references or guidelines inside skills/extract-learnings/references/ to complete the task.
</objective>

<execution_context>
@skills/extract-learnings/SKILL.md
</execution_context>
