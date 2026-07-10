---
name: skill:pause-work
description: Create context handoff when pausing work mid-phase
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
Trigger and execute the Antigravity skill: pause-work.
Load the prompt instructions from skills/pause-work/SKILL.md and consult the copy-pasteable references or guidelines inside skills/pause-work/references/ to complete the task.
</objective>

<execution_context>
@skills/pause-work/SKILL.md
</execution_context>
