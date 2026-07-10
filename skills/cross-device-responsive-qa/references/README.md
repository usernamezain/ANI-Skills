# Skill Reference: cross-device-responsive-qa

This directory contains reference documentation and execution guidelines for the `cross-device-responsive-qa` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `cross-device-responsive-qa`
- **Purpose**: Systematically verify a site actually works across real devices, viewports, pointer types, and browsers — not just "looks fine in one browser window." Use after building any responsive or animated section, whenever the user asks to "test", "make sure it works everywhere", "check responsiveness", or reports something "breaks/looks wrong" on a specific device. This is a verification checklist skill, not a code-pattern skill.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
