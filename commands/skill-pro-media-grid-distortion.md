---
name: skill:pro:grid-distortion
description: Generate an interactive WebGL-based grid displacement distortion canvas using Three.js DataTexture and custom shaders. Features chromatic aberration (RGB channels split) responsive to mouse gesture speeds, relaxation friction physics, and automatic container aspect ratio cover fitting. Use this skill when the user requests grid distortion, mouse ripples on images, interactive liquid picture distortion, or chromatic WebGL image hover warp effects.
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
Trigger and execute the Antigravity skill: pro:grid-distortion.
Load the prompt instructions from skills/pro/media/grid-distortion/SKILL.md and consult the copy-pasteable references or guidelines inside skills/pro/media/grid-distortion/references/ to complete the task.
</objective>

<execution_context>
@skills/pro/media/grid-distortion/SKILL.md
</execution_context>
