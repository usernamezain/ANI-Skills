---
name: skill:graphify
description: Build, query, and inspect the project knowledge graph in .planning/graphs/
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
Trigger and execute the Antigravity skill: graphify.
Load the prompt instructions from skills/graphify/SKILL.md and consult the copy-pasteable references or guidelines inside skills/graphify/references/ to complete the task.
</objective>

<execution_context>
@skills/graphify/SKILL.md
</execution_context>
