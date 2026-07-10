# Skill Reference: frontend-ui-engineering

This directory contains reference documentation and execution guidelines for the `frontend-ui-engineering` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `frontend-ui-engineering`
- **Purpose**: Builds production-quality UIs. Use when building or modifying user-facing interfaces. Use when creating components, implementing layouts, managing state, or when the output needs to look and feel production-quality rather than AI-generated.
- **Integration Prefix**: `antigravity:frontend-ui-engineering`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
