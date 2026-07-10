# Skill Reference: ui-researcher

This directory contains reference documentation and execution guidelines for the `ui-researcher` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `ui-researcher`
- **Purpose**: Produces UI-SPEC.md design contract for frontend phases. Reads upstream artifacts, detects design system state, asks only unanswered questions. Spawned by /antigravity:ui-phase orchestrator.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
