---
name: skill:advanced-evaluation
description: This skill should be used when the user asks to "implement LLM-as-judge", "compare model outputs", "create evaluation rubrics", "mitigate evaluation bias", or mentions direct scoring, pairwise comparison, position bias, evaluation pipelines, or automated quality assessment.
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
Trigger and execute the Antigravity skill: advanced-evaluation.
Load the prompt instructions from skills/advanced-evaluation/SKILL.md and consult the copy-pasteable references or guidelines inside skills/advanced-evaluation/references/ to complete the task.
</objective>

<execution_context>
@skills/advanced-evaluation/SKILL.md
</execution_context>
