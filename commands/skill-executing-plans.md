---
name: skill:executing-plans
description: Use when you have a written implementation plan to execute in a separate session with review checkpoints
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
Trigger and execute the Antigravity skill: executing-plans.
Load the prompt instructions from skills/executing-plans/SKILL.md and consult the copy-pasteable references or guidelines inside skills/executing-plans/references/ to complete the task.
</objective>

<execution_context>
@skills/executing-plans/SKILL.md
</execution_context>
