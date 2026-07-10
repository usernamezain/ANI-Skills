# Skill Reference: test-driven-development

This directory contains reference documentation and execution guidelines for the `test-driven-development` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `test-driven-development`
- **Purpose**: Use when implementing any feature or bugfix, before writing implementation code
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
