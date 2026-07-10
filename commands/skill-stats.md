---
name: skill:stats
description: Display project statistics — phases, plans, requirements, git metrics, and timeline
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
Trigger and execute the Antigravity skill: stats.
Load the prompt instructions from skills/stats/SKILL.md and consult the copy-pasteable references or guidelines inside skills/stats/references/ to complete the task.
</objective>

<execution_context>
@skills/stats/SKILL.md
</execution_context>
