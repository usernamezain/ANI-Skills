---
name: skill:baoyu-post-to-x
description: Posts content and articles to X (Twitter). Supports regular posts with images/videos and X Articles (long-form Markdown). In Codex, honor explicit requests for the Codex Chrome plugin/@chrome by using the Chrome Extension workflow; otherwise use Chrome Computer Use when available and fall back to real Chrome CDP scripts only when allowed. Use when user asks to "post to X", "tweet", "publish to Twitter", or "share on X".
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
Trigger and execute the Antigravity skill: baoyu-post-to-x.
Load the prompt instructions from skills/baoyu-post-to-x/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-post-to-x/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-post-to-x/SKILL.md
</execution_context>
