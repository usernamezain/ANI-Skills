---
name: skill:baoyu-markdown-to-html
description: Converts Markdown to styled HTML with WeChat-compatible themes. Supports code highlighting, math, PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links. Use when user asks for "markdown to html", "convert md to html", "md 转 html", "微信外链转底部引用", or needs styled HTML output from markdown.
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
Trigger and execute the Antigravity skill: baoyu-markdown-to-html.
Load the prompt instructions from skills/baoyu-markdown-to-html/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-markdown-to-html/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-markdown-to-html/SKILL.md
</execution_context>
