# Skill Reference: context-engineering

This directory contains reference documentation and execution guidelines for the `context-engineering` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `context-engineering`
- **Purpose**: Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks, or when you need to configure rules files and context for a project.
- **Integration Prefix**: `antigravity:context-engineering`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
