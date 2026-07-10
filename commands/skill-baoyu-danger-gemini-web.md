---
name: skill:baoyu-danger-gemini-web
description: Generates images and text via reverse-engineered Gemini Web API. Supports text generation, image generation from prompts, reference images for vision input, and multi-turn conversations. Use when other skills need image generation backend, or when user requests "generate image with Gemini", "Gemini text generation", or needs vision-capable AI generation.
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
Trigger and execute the Antigravity skill: baoyu-danger-gemini-web.
Load the prompt instructions from skills/baoyu-danger-gemini-web/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-danger-gemini-web/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-danger-gemini-web/SKILL.md
</execution_context>
