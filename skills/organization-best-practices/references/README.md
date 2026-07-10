# Skill Reference: organization-best-practices

This directory contains reference documentation and execution guidelines for the `organization-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `organization-best-practices`
- **Purpose**: Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin. Use when users need org setup, team management, member roles, access control, or the Better Auth organization plugin.
- **Integration Prefix**: `antigravity:organization-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
