# Skill Reference: framework-selector

This directory contains reference documentation and execution guidelines for the `framework-selector` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `framework-selector`
- **Purpose**: Presents an interactive decision matrix to surface the right AI/LLM framework for the user's specific use case. Produces a scored recommendation with rationale. Spawned by /antigravity:ai-integration-phase and /select-framework orchestrators.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
