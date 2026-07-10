---
name: skill:score-eval
description: Score the evaluation diff against the evaluation rubric.
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
Trigger and execute the Antigravity skill: score-eval.
Load the prompt instructions from skills/score-eval/SKILL.md and consult the copy-pasteable references or guidelines inside skills/score-eval/references/ to complete the task.
</objective>

<execution_context>
@skills/score-eval/SKILL.md
</execution_context>
