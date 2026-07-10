# Skill Reference: provider-docs

This directory contains reference documentation and execution guidelines for the `provider-docs` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `provider-docs`
- **Purpose**: Create, update, and review Terraform provider documentation for Terraform Registry using HashiCorp-recommended patterns, tfplugindocs templates, and schema descriptions. Use when adding or changing provider configuration, resources, data sources, ephemeral resources, list resources, functions, or guides; when validating generated docs; and when troubleshooting missing or incorrect Registry documentation.
- **Integration Prefix**: `antigravity:provider-docs`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
