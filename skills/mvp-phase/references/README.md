# Skill Reference: mvp-phase

This directory contains reference documentation and execution guidelines for the `mvp-phase` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `mvp-phase`
- **Purpose**: Plan a phase as a vertical MVP slice — user story, SPIDR splitting, then plan-phase
- **Allowed Tools**: `- Read`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
