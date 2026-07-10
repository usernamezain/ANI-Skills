# Skill Reference: terraform-search-import

This directory contains reference documentation and execution guidelines for the `terraform-search-import` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `terraform-search-import`
- **Purpose**: Discover existing cloud resources using Terraform Search queries and bulk import them into Terraform management. Use when bringing unmanaged infrastructure under Terraform control, auditing cloud resources, or migrating to IaC.
- **Integration Prefix**: `antigravity:terraform-search-import`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
