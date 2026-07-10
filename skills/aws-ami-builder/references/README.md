# Skill Reference: aws-ami-builder

This directory contains reference documentation and execution guidelines for the `aws-ami-builder` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `aws-ami-builder`
- **Purpose**: Build Amazon Machine Images (AMIs) with Packer using the amazon-ebs builder. Use when creating custom AMIs for EC2 instances.
- **Integration Prefix**: `antigravity:aws-ami-builder`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
