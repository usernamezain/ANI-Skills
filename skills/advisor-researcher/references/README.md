# Skill Reference: advisor-researcher

This directory contains reference documentation and execution guidelines for the `advisor-researcher` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `advisor-researcher`
- **Purpose**: Researches a single gray area decision and returns a structured comparison table with rationale. Spawned by discuss-phase advisor mode.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
