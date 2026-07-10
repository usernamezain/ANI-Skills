---
name: skill:baoyu-comic
description: Knowledge comic creator supporting multiple art styles and tones. Creates original educational comics with detailed panel layouts and batch-capable image generation. Use when user asks to create "知识漫画", "教育漫画", "biography comic", "tutorial comic", or "Logicomix-style comic".
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
Trigger and execute the Antigravity skill: baoyu-comic.
Load the prompt instructions from skills/baoyu-comic/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-comic/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-comic/SKILL.md
</execution_context>
