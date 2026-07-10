# Skill Reference: user-profiler

This directory contains reference documentation and execution guidelines for the `user-profiler` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `user-profiler`
- **Purpose**: Analyzes extracted session messages across 8 behavioral dimensions to produce a scored developer profile with confidence levels and evidence. Spawned by profile orchestration workflows.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
