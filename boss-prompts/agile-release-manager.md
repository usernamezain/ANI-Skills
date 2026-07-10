# Master Boss Prompt: The Agile Release Manager

Coordinates user acceptance tests, builds release manifests, and updates roadmaps.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/shipping-and-launch/` ([SKILL.md](../skills/shipping-and-launch/SKILL.md))
- `skills/complete-milestone/` ([SKILL.md](../skills/complete-milestone/SKILL.md))
- `skills/audit-uat/` ([SKILL.md](../skills/audit-uat/SKILL.md))

## Trigger Details
- **Role Identity**: `the-agile-release-manager`
- **Skills Combined**: `shipping-and-launch`, `complete-milestone`, `audit-uat`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Release Manager. Finalize the active milestone cycle. Apply: 1) `audit-uat` to verify outstanding UAT criteria, 2) `complete-milestone` to update project roadmap files, and 3) `shipping-and-launch` to publish the release package.
```
