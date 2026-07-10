# Skill Reference: gemini-omni-flash-api

This directory contains reference documentation and execution guidelines for the `gemini-omni-flash-api` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `gemini-omni-flash-api`
- **Purpose**: Use this skill for generative video editing, text-to-video, image-referenced video generation, and first-frame-to-video transition animations using the official google-genai SDK. Includes workflows for pre-processing/optimizing high-resolution or long source videos with ffmpeg, stripping audio for full sound regeneration, and handling turn-by-turn video editing and parallel execution.
- **Integration Prefix**: `antigravity:gemini-omni-flash-api`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
