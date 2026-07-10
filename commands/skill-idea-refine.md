---
name: skill:idea-refine
description: Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use when an idea is still vague, when you need to stress-test assumptions before committing to a plan, or when you want to expand options before converging on one. Triggers on "ideate", "refine this idea", or "stress-test my plan".
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
Trigger and execute the Antigravity skill: idea-refine.
Load the prompt instructions from skills/idea-refine/SKILL.md and consult the copy-pasteable references or guidelines inside skills/idea-refine/references/ to complete the task.
</objective>

<execution_context>
@skills/idea-refine/SKILL.md
</execution_context>
