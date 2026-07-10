---
name: skill:resume-work
description: Resume work from previous session with full context restoration
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
Trigger and execute the Antigravity skill: resume-work.
Load the prompt instructions from skills/resume-work/SKILL.md and consult the copy-pasteable references or guidelines inside skills/resume-work/references/ to complete the task.
</objective>

<execution_context>
@skills/resume-work/SKILL.md
</execution_context>
