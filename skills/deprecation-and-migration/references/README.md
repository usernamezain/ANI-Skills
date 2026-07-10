# Skill Reference: deprecation-and-migration

This directory contains reference documentation and execution guidelines for the `deprecation-and-migration` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `deprecation-and-migration`
- **Purpose**: Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another. Use when deciding whether to maintain or sunset existing code.
- **Integration Prefix**: `antigravity:deprecation-and-migration`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
