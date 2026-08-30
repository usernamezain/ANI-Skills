---
name: ai:youtube-watcher
description: Fetch and read transcripts from YouTube videos. Use when you need to summarize a video, answer questions about its content, or extract information from it.
author: michael gathara
version: 1.0.0
triggers:
  - "watch youtube"
  - "summarize video"
  - "video transcript"
  - "youtube summary"
  - "analyze video"
metadata: {"clawdbot":{"emoji":"📺","requires":{"bins":["yt-dlp"]},"install":[{"id":"brew","kind":"brew","formula":"yt-dlp","bins":["yt-dlp"],"label":"Install yt-dlp (brew)"},{"id":"pip","kind":"pip","package":"yt-dlp","bins":["yt-dlp"],"label":"Install yt-dlp (pip)"}]}}
---

# YouTube Watcher

Fetch transcripts from YouTube videos to enable summarization, QA, and content extraction.

## Usage

### Get Transcript

Retrieve the text transcript of a video.

```bash
python3 {baseDir}/scripts/get_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"
```

## Examples

**Summarize a video:**

1. Get the transcript:
   ```bash
   python3 {baseDir}/scripts/get_transcript.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
   ```
2. Read the output and summarize it for the user.

**Find specific information:**

1. Get the transcript.
2. Search the text for keywords or answer the user's question based on the content.

## Notes

- Requires `yt-dlp` to be installed and available in the PATH.
- Works with videos that have closed captions (CC) or auto-generated subtitles.
- If a video has no subtitles, the script will fail with an error message.


## When to Use
- Use this skill when the task involves `youtube-watcher` workflows, tooling, or domain requirements from `gooseworks-ai/goose-skills`.
- Trigger on user keywords: `youtube-watcher`, `goose-skills`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
