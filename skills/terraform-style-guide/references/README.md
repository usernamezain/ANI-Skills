# Skill Reference: terraform-style-guide

This directory contains reference documentation and execution guidelines for the `terraform-style-guide` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `terraform-style-guide`
- **Purpose**: Generate Terraform HCL code following HashiCorp's official style conventions and best practices. Use when writing, reviewing, or generating Terraform configurations.
- **Integration Prefix**: `antigravity:terraform-style-guide`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
