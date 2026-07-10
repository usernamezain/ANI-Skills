---
name: skill:baoyu-youtube-transcript
description: Downloads YouTube video transcripts/subtitles and cover images by URL or video ID. Supports multiple languages, translation, chapters, and speaker identification. Caches raw data for fast re-formatting. Use when user asks to "get YouTube transcript", "download subtitles", "get captions", "YouTube字幕", "YouTube封面", "视频封面", "video thumbnail", "video cover image", or provides a YouTube URL and wants the transcript/subtitle text or cover image extracted.
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
Trigger and execute the Antigravity skill: baoyu-youtube-transcript.
Load the prompt instructions from skills/baoyu-youtube-transcript/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-youtube-transcript/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-youtube-transcript/SKILL.md
</execution_context>
