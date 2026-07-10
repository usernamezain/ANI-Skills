---
name: skill:mempalace-recall
description: Recall decisions, patterns, and surprises from MemPalace before planning
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
Trigger and execute the Antigravity skill: mempalace-recall.
Load the prompt instructions from skills/mempalace-recall/SKILL.md and consult the copy-pasteable references or guidelines inside skills/mempalace-recall/references/ to complete the task.
</objective>

<execution_context>
@skills/mempalace-recall/SKILL.md
</execution_context>
