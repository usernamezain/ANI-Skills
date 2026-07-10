# Skill Reference: gemini-interactions-api

This directory contains reference documentation and execution guidelines for the `gemini-interactions-api` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `gemini-interactions-api`
- **Purpose**: Use this skill when writing code that calls the Gemini API for text generation, multi-turn chat, multimodal understanding, image generation, video generation, streaming responses, background research tasks, function calling, structured output, or migrating from the old generateContent API. This skill covers the Interactions API, the recommended way to use Gemini models and agents in Python and TypeScript.
- **Integration Prefix**: `antigravity:gemini-interactions-api`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
