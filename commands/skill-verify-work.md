---
name: skill:verify-work
description: Validate built features through conversational UAT
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
Trigger and execute the Antigravity skill: verify-work.
Load the prompt instructions from skills/verify-work/SKILL.md and consult the copy-pasteable references or guidelines inside skills/verify-work/references/ to complete the task.
</objective>

<execution_context>
@skills/verify-work/SKILL.md
</execution_context>
