---
name: skill:writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
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
Trigger and execute the Antigravity skill: writing-plans.
Load the prompt instructions from skills/writing-plans/SKILL.md and consult the copy-pasteable references or guidelines inside skills/writing-plans/references/ to complete the task.
</objective>

<execution_context>
@skills/writing-plans/SKILL.md
</execution_context>
