# Skill Reference: azure-verified-modules

This directory contains reference documentation and execution guidelines for the `azure-verified-modules` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `azure-verified-modules`
- **Purpose**: Azure Verified Modules (AVM) requirements and best practices for developing certified Azure Terraform modules. Use when creating or reviewing Azure modules that need AVM certification.
- **Integration Prefix**: `antigravity:azure-verified-modules`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
