---
name: skill:planning-with-files
description: Implements Manus-style file-based planning to organize and track progress on complex tasks. Creates task_plan.md, findings.md, and progress.md. Use when asked to plan out, break down, or organize a multi-step project, research task, or any work requiring 5+ tool calls. Supports automatic session recovery after /clear.
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
Trigger and execute the Antigravity skill: planning-with-files.
Load the prompt instructions from skills/planning-with-files/SKILL.md and consult the copy-pasteable references or guidelines inside skills/planning-with-files/references/ to complete the task.
</objective>

<execution_context>
@skills/planning-with-files/SKILL.md
</execution_context>
