# Skill Reference: two-factor-authentication-best-practices

This directory contains reference documentation and execution guidelines for the `two-factor-authentication-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `two-factor-authentication-best-practices`
- **Purpose**: Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin. Use when users need MFA, multi-factor authentication, authenticator setup, or login security with Better Auth.
- **Integration Prefix**: `antigravity:two-factor-authentication-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
