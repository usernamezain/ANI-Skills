# Skill Reference: performance-optimization

This directory contains reference documentation and execution guidelines for the `performance-optimization` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `performance-optimization`
- **Purpose**: Optimizes application performance. Use when performance requirements exist, when you suspect performance regressions, or when Core Web Vitals or load times need improvement. Use when profiling reveals bottlenecks that need fixing.
- **Integration Prefix**: `antigravity:performance-optimization`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
