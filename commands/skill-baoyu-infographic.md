---
name: skill:baoyu-infographic
description: Generate professional infographics with 21 layout types and 22 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics. Use when user asks to create "infographic", "信息图", "visual summary", "可视化", or "高密度信息大图".
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
Trigger and execute the Antigravity skill: baoyu-infographic.
Load the prompt instructions from skills/baoyu-infographic/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-infographic/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-infographic/SKILL.md
</execution_context>
