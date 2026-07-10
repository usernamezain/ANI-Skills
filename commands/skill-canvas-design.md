---
name: skill:canvas-design
description: Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.
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
Trigger and execute the Antigravity skill: canvas-design.
Load the prompt instructions from skills/canvas-design/SKILL.md and consult the copy-pasteable references or guidelines inside skills/canvas-design/references/ to complete the task.
</objective>

<execution_context>
@skills/canvas-design/SKILL.md
</execution_context>
