# Skill Reference: incremental-implementation

This directory contains reference documentation and execution guidelines for the `incremental-implementation` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `incremental-implementation`
- **Purpose**: Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
- **Integration Prefix**: `antigravity:incremental-implementation`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
