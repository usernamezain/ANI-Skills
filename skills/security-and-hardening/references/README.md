# Skill Reference: security-and-hardening

This directory contains reference documentation and execution guidelines for the `security-and-hardening` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `security-and-hardening`
- **Purpose**: Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integrations. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services.
- **Integration Prefix**: `antigravity:security-and-hardening`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
