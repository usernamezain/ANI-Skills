# Skill Reference: better-auth-best-practices

This directory contains reference documentation and execution guidelines for the `better-auth-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `better-auth-best-practices`
- **Purpose**: Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.
- **Integration Prefix**: `antigravity:better-auth-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
