---
name: skill:baoyu-image-cards
description: Generates infographic image card series with 12 visual styles, 8 layouts, and 3 color palettes. Breaks content into 1-10 cartoon-style image cards optimized for social media engagement. Use when user mentions "小红书图片", "小红书种草", "小绿书", "微信图文", "微信贴图", "image cards", "图片卡片", or wants social media infographic series.
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
Trigger and execute the Antigravity skill: baoyu-image-cards.
Load the prompt instructions from skills/baoyu-image-cards/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-image-cards/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-image-cards/SKILL.md
</execution_context>
