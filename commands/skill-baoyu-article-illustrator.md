---
name: skill:baoyu-article-illustrator
description: Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach. Use when user asks to "illustrate article", "add images", "generate images for article", or "为文章配图".
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
Trigger and execute the Antigravity skill: baoyu-article-illustrator.
Load the prompt instructions from skills/baoyu-article-illustrator/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-article-illustrator/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-article-illustrator/SKILL.md
</execution_context>
