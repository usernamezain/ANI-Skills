---
name: skill:onboard
description: Guide existing codebase onboarding through mapping, doc ingest, and planning setup
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
Trigger and execute the Antigravity skill: onboard.
Load the prompt instructions from skills/onboard/SKILL.md and consult the copy-pasteable references or guidelines inside skills/onboard/references/ to complete the task.
</objective>

<execution_context>
@skills/onboard/SKILL.md
</execution_context>
