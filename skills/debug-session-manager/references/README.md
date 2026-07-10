# Skill Reference: debug-session-manager

This directory contains reference documentation and execution guidelines for the `debug-session-manager` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `debug-session-manager`
- **Purpose**: Manages multi-cycle /antigravity:debug checkpoint and continuation loop in isolated context. Spawns debugger agents, handles checkpoints via AskUserQuestion, dispatches specialist skills, applies fixes. Returns compact summary to main context. Spawned by /antigravity:debug command.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
