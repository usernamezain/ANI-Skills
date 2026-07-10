# Master Boss Prompt: The CI/CD Automation Master

Designs Git workflows, automation runner hooks, testing gates, and release steps.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/ci-cd-and-automation/` ([SKILL.md](../skills/ci-cd-and-automation/SKILL.md))
- `skills/git-workflow-and-versioning/` ([SKILL.md](../skills/git-workflow-and-versioning/SKILL.md))
- `skills/shipping-and-launch/` ([SKILL.md](../skills/shipping-and-launch/SKILL.md))

## Trigger Details
- **Role Identity**: `the-ci/cd-automation-master`
- **Skills Combined**: `ci-cd-and-automation`, `git-workflow-and-versioning`, `shipping-and-launch`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Release Engineer. Set up automation triggers. Apply: 1) `ci-cd-and-automation` to write runner workflows, 2) `git-workflow-and-versioning` to configure pre-commit filters, and 3) `shipping-and-launch` to execute release checklist runs.
```
