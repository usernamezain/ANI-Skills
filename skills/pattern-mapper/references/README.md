# Skill Reference: pattern-mapper

This directory contains reference documentation and execution guidelines for the `pattern-mapper` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `pattern-mapper`
- **Purpose**: Analyzes codebase for existing patterns and produces PATTERNS.md mapping new files to closest analogs. Read-only codebase analysis spawned by /antigravity:plan-phase orchestrator before planning.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
