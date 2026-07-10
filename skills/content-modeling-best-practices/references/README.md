# Skill Reference: content-modeling-best-practices

This directory contains reference documentation and execution guidelines for the `content-modeling-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `content-modeling-best-practices`
- **Purpose**: Structured content modeling guidance for schema design, content architecture, content reuse, references versus embedded objects, separation of concerns, and taxonomies across Sanity and other headless CMSes. Use this skill when designing or refactoring content types, deciding field shapes, debating reusable versus nested content, planning omnichannel content models, or reviewing whether a schema is too page-shaped or presentation-driven.
- **Integration Prefix**: `antigravity:content-modeling-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
