# Skill Reference: observability-and-instrumentation

This directory contains reference documentation and execution guidelines for the `observability-and-instrumentation` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `observability-and-instrumentation`
- **Purpose**: Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any feature that runs in production and you need evidence it works. Use when production issues are reported but you can't tell what happened from the available data.
- **Integration Prefix**: `antigravity:observability-and-instrumentation`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
