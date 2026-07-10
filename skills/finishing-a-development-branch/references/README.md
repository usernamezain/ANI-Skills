# Skill Reference: finishing-a-development-branch

This directory contains reference documentation and execution guidelines for the `finishing-a-development-branch` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `finishing-a-development-branch`
- **Purpose**: Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
