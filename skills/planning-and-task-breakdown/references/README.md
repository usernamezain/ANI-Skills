# Skill Reference: planning-and-task-breakdown

This directory contains reference documentation and execution guidelines for the `planning-and-task-breakdown` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `planning-and-task-breakdown`
- **Purpose**: Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.
- **Integration Prefix**: `antigravity:planning-and-task-breakdown`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
