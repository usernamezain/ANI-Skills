---
name: skill:gemini-omni-flash-api
description: Use this skill for generative video editing, text-to-video, image-referenced video generation, and first-frame-to-video transition animations using the official google-genai SDK. Includes workflows for pre-processing/optimizing high-resolution or long source videos with ffmpeg, stripping audio for full sound regeneration, and handling turn-by-turn video editing and parallel execution.
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
Trigger and execute the Antigravity skill: gemini-omni-flash-api.
Load the prompt instructions from skills/gemini-omni-flash-api/SKILL.md and consult the copy-pasteable references or guidelines inside skills/gemini-omni-flash-api/references/ to complete the task.
</objective>

<execution_context>
@skills/gemini-omni-flash-api/SKILL.md
</execution_context>
