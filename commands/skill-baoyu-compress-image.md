---
name: skill:baoyu-compress-image
description: Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.
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
Trigger and execute the Antigravity skill: baoyu-compress-image.
Load the prompt instructions from skills/baoyu-compress-image/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-compress-image/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-compress-image/SKILL.md
</execution_context>
