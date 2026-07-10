# Skill Reference: plan-review-convergence

This directory contains reference documentation and execution guidelines for the `plan-review-convergence` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `plan-review-convergence`
- **Purpose**: "Cross-AI plan convergence loop — replan with review feedback until no HIGH concerns remain."
- **Allowed Tools**: `- Read`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
