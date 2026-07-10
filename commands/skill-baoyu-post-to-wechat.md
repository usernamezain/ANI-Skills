---
name: skill:baoyu-post-to-wechat
description: Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP. Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images. Markdown article workflows default to converting ordinary external links into bottom citations for WeChat-friendly output. Use when user mentions "发布公众号", "post to wechat", "微信公众号", or "贴图/图文/文章".
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
Trigger and execute the Antigravity skill: baoyu-post-to-wechat.
Load the prompt instructions from skills/baoyu-post-to-wechat/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-post-to-wechat/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-post-to-wechat/SKILL.md
</execution_context>
