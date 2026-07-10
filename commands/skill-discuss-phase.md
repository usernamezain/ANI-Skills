---
name: skill:discuss-phase
description: Gather phase context through adaptive questioning before planning.
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
Trigger and execute the Antigravity skill: discuss-phase.
Load the prompt instructions from skills/discuss-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/discuss-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/discuss-phase/SKILL.md
</execution_context>
