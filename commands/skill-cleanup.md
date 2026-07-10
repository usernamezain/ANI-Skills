---
name: skill:cleanup
description: Archive accumulated phase directories from completed milestones
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
Trigger and execute the Antigravity skill: cleanup.
Load the prompt instructions from skills/cleanup/SKILL.md and consult the copy-pasteable references or guidelines inside skills/cleanup/references/ to complete the task.
</objective>

<execution_context>
@skills/cleanup/SKILL.md
</execution_context>
