---
name: skill:baoyu-post-to-weibo
description: Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo", "share on Weibo", "写微博", or "微博头条文章".
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
Trigger and execute the Antigravity skill: baoyu-post-to-weibo.
Load the prompt instructions from skills/baoyu-post-to-weibo/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-post-to-weibo/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-post-to-weibo/SKILL.md
</execution_context>
