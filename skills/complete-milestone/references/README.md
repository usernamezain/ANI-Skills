# Skill Reference: complete-milestone

This directory contains reference documentation and execution guidelines for the `complete-milestone` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `complete-milestone`
- **Purpose**: Archive completed milestone and prepare for next version
- **Allowed Tools**: `- Read`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
