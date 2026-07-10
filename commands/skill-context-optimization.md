---
name: skill:context-optimization
description: This skill should be used when the user asks to "optimize context", "reduce token costs", "improve context efficiency", "implement KV-cache optimization", "partition context", or mentions context limits, observation masking, context budgeting, or extending effective context capacity.
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
Trigger and execute the Antigravity skill: context-optimization.
Load the prompt instructions from skills/context-optimization/SKILL.md and consult the copy-pasteable references or guidelines inside skills/context-optimization/references/ to complete the task.
</objective>

<execution_context>
@skills/context-optimization/SKILL.md
</execution_context>
