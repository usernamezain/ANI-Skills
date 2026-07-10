---
name: skill:shipping-and-launch
description: Prepares production launches. Use when preparing to deploy to production. Use when you need a pre-launch checklist, when setting up monitoring, when planning a staged rollout, or when you need a rollback strategy.
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
Trigger and execute the Antigravity skill: shipping-and-launch.
Load the prompt instructions from skills/shipping-and-launch/SKILL.md and consult the copy-pasteable references or guidelines inside skills/shipping-and-launch/references/ to complete the task.
</objective>

<execution_context>
@skills/shipping-and-launch/SKILL.md
</execution_context>
