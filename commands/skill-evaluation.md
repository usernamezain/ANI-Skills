---
name: skill:evaluation
description: This skill should be used when the user asks to "evaluate agent performance", "build test framework", "measure agent quality", "create evaluation rubrics", or mentions LLM-as-judge, multi-dimensional evaluation, agent testing, or quality gates for agent pipelines.
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
Trigger and execute the Antigravity skill: evaluation.
Load the prompt instructions from skills/evaluation/SKILL.md and consult the copy-pasteable references or guidelines inside skills/evaluation/references/ to complete the task.
</objective>

<execution_context>
@skills/evaluation/SKILL.md
</execution_context>
