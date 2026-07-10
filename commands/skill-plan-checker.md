---
name: skill:plan-checker
description: Verifies plans will achieve phase goal before execution. Goal-backward analysis of plan quality. Spawned by /antigravity:plan-phase orchestrator.
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
Trigger and execute the Antigravity skill: plan-checker.
Load the prompt instructions from skills/plan-checker/SKILL.md and consult the copy-pasteable references or guidelines inside skills/plan-checker/references/ to complete the task.
</objective>

<execution_context>
@skills/plan-checker/SKILL.md
</execution_context>
