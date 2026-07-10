# Skill Reference: terraform-stacks

This directory contains reference documentation and execution guidelines for the `terraform-stacks` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `terraform-stacks`
- **Purpose**: Comprehensive guide for working with HashiCorp Terraform Stacks. Use when creating, modifying, or validating Terraform Stack configurations (.tfcomponent.hcl, .tfdeploy.hcl files), working with stack components and deployments from local modules, public registry, or private registry sources, managing multi-region or multi-environment infrastructure, or troubleshooting Terraform Stacks syntax and structure.
- **Integration Prefix**: `antigravity:terraform-stacks`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
