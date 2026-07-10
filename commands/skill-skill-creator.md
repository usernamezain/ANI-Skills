---
name: skill:skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
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
Trigger and execute the Antigravity skill: skill-creator.
Load the prompt instructions from skills/skill-creator/SKILL.md and consult the copy-pasteable references or guidelines inside skills/skill-creator/references/ to complete the task.
</objective>

<execution_context>
@skills/skill-creator/SKILL.md
</execution_context>
