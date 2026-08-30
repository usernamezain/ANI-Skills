---
name: ai:recipe-collect-form-responses
description: "Retrieve and review responses from a Google Form."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-forms
---

# Check Form Responses

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-forms`

Retrieve and review responses from a Google Form.

## Steps

1. List forms: `gws forms forms list` (if you don't have the form ID)
2. Get form details: `gws forms forms get --params '{"formId": "FORM_ID"}'`
3. Get responses: `gws forms forms responses list --params '{"formId": "FORM_ID"}' --format table`



## When to Use
- Use this skill when the task involves `recipe-collect-form-responses` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-collect-form-responses`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
