# Skill Reference: azure-image-builder

This directory contains reference documentation and execution guidelines for the `azure-image-builder` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `azure-image-builder`
- **Purpose**: Build Azure managed images and Azure Compute Gallery images with Packer. Use when creating custom images for Azure VMs.
- **Integration Prefix**: `antigravity:azure-image-builder`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
