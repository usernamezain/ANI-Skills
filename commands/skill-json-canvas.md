---
name: skill:json-canvas
description: Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or when the user mentions Canvas files in Obsidian.
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
Trigger and execute the Antigravity skill: json-canvas.
Load the prompt instructions from skills/json-canvas/SKILL.md and consult the copy-pasteable references or guidelines inside skills/json-canvas/references/ to complete the task.
</objective>

<execution_context>
@skills/json-canvas/SKILL.md
</execution_context>
