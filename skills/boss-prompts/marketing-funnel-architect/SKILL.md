---
name: boss:marketing-funnel-architect
description: Orchestrates sign-up boxes, custom fields, and large navigation headers to drive user conversions.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Marketing Funnel Architect

Orchestrates sign-up boxes, custom fields, and large navigation headers to drive user conversions.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/morph-newsletter-signup-section/` ([SKILL.md](../skills/morph-newsletter-signup-section/SKILL.md))
- `skills/magnetic-huge-text-nav-links/` ([SKILL.md](../skills/magnetic-huge-text-nav-links/SKILL.md))
- `skills/floating-label-contact-form-section/` ([SKILL.md](../skills/floating-label-contact-form-section/SKILL.md))

## Trigger Details
- **Role Identity**: `the-marketing-funnel-architect`
- **Skills Combined**: `morph-newsletter-signup-section`, `magnetic-huge-text-nav-links`, `floating-label-contact-form-section`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Conversion Optimization Developer. Design a marketing page. Apply: 1) `morph-newsletter-signup-section` to create newsletter signup layouts, 2) `magnetic-huge-text-nav-links` for menus, and 3) `floating-label-contact-form-section` to build contact forms.
```
