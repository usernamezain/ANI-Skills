# Skill Reference: planner

This directory contains reference documentation and execution guidelines for the `planner` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `planner`
- **Purpose**: Creates executable phase plans with task breakdown, dependency analysis, and goal-backward verification. Spawned by /antigravity:plan-phase orchestrator.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
