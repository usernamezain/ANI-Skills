---
name: skill:dsa-topological-sort
description: Performs linear ordering of vertices in directed acyclic graphs (DAG). Triggered by topological sort, tasks scheduling, tasks scheduling order, alien dictionary, reconstructing a sequence.
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
Trigger and execute the Antigravity skill: dsa-topological-sort.
Load the prompt instructions from skills/dsa-topological-sort/SKILL.md and consult the copy-pasteable references or guidelines inside skills/dsa-topological-sort/references/ to complete the task.
</objective>

<execution_context>
@skills/dsa-topological-sort/SKILL.md
</execution_context>
