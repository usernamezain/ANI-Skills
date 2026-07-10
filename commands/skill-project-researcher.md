---
name: skill:project-researcher
description: Researches domain ecosystem before roadmap creation. Produces files in .planning/research/ consumed during roadmap creation. Spawned by /antigravity:new-project or /antigravity:new-milestone orchestrators.
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
Trigger and execute the Antigravity skill: project-researcher.
Load the prompt instructions from skills/project-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/project-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/project-researcher/SKILL.md
</execution_context>
