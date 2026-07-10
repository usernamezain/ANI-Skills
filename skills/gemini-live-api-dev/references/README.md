# Skill Reference: gemini-live-api-dev

This directory contains reference documentation and execution guidelines for the `gemini-live-api-dev` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `gemini-live-api-dev`
- **Purpose**: Use this skill when building real-time, bidirectional streaming applications with the Gemini Live API. Covers WebSocket-based audio/video/text streaming, voice activity detection (VAD), native audio features, function calling, session management, ephemeral tokens for client-side auth, live translation, and all Live API configuration options. SDKs covered - google-genai (Python), @google/genai (JavaScript/TypeScript).
- **Integration Prefix**: `antigravity:gemini-live-api-dev`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
