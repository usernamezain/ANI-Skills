# Skill Reference: terraform-test

This directory contains reference documentation and execution guidelines for the `terraform-test` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `terraform-test`
- **Purpose**: Comprehensive guide for writing and running Terraform tests. Use when creating test files (.tftest.hcl), writing test scenarios with run blocks, validating infrastructure behavior with assertions, mocking providers and data sources, testing module outputs and resource configurations, or troubleshooting Terraform test syntax and execution.
- **Integration Prefix**: `antigravity:terraform-test`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
