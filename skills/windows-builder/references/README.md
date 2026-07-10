# Skill Reference: windows-builder

This directory contains reference documentation and execution guidelines for the `windows-builder` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `windows-builder`
- **Purpose**: Build Windows images with Packer using WinRM communicator and PowerShell provisioners. Use when creating Windows AMIs, Azure images, or VMware templates.
- **Integration Prefix**: `antigravity:windows-builder`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
