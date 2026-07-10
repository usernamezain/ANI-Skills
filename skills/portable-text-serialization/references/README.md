# Skill Reference: portable-text-serialization

This directory contains reference documentation and execution guidelines for the `portable-text-serialization` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `portable-text-serialization`
- **Purpose**: Render and serialize Portable Text to React, Svelte, Vue, Astro, HTML, Markdown, and plain text. Use when implementing Portable Text rendering in any frontend framework, building custom serializers for non-standard block types, converting Portable Text to HTML strings server-side, converting Portable Text to Markdown, extracting plain text from Portable Text, or troubleshooting rendering issues with marks, blocks, lists, or custom types.
- **Integration Prefix**: `antigravity:portable-text-serialization`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
