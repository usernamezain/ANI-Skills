# Skill Reference: next

This directory contains reference documentation and execution guidelines for the `next` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `next`
- **Purpose**: "Smart entry — detect project state and route to the right next ANI action."
- **Allowed Tools**: `- Read`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
