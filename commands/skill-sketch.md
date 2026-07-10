---
name: skill:sketch
description: Sketch UI/design ideas with throwaway HTML mockups, or propose what to sketch next (frontier mode)
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
Trigger and execute the Antigravity skill: sketch.
Load the prompt instructions from skills/sketch/SKILL.md and consult the copy-pasteable references or guidelines inside skills/sketch/references/ to complete the task.
</objective>

<execution_context>
@skills/sketch/SKILL.md
</execution_context>
