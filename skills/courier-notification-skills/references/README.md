# Skill Reference: courier-notification-skills

This directory contains reference documentation and execution guidelines for the `courier-notification-skills` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `courier-notification-skills`
- **Purpose**: Use when building notifications with Courier across email, SMS, push, in-app inbox, Slack, Teams, or WhatsApp. Covers transactional messages (password reset, OTP, orders, billing), growth notifications (onboarding, engagement, referral), multi-channel routing, preferences and topics, reliability and webhooks, journeys (multi-step notification sequences via API), template CRUD and Elemental content, routing strategies, provider configuration, the Courier CLI and MCP server, and migrations from Knock, Novu, or other notification systems.
- **Integration Prefix**: `antigravity:courier-notification-skills`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
