# marketing:validate-output

Validate marketing content against a structural schema — required sections, word counts, markdown formatting, placeholder text (TBD, lorem ipsum, unfilled variables), CTA-topic consistency, and SEO structure — returning a pass/fail checklist with fix instructions. Eight built-in schemas plus custom JSON schemas; auto-detects the schema when none is named. Triggers on \"/digital-marketing-pro:validate-output\", \"check this post against the blog schema\", \"is this email structurally ready to ship\", \"scan for leftover placeholders\", \"why does this draft feel incomplete\". Runs output-validator.py and reads brand templates and custom schemas; complements /digital-marketing-pro:eval-content, which judges quality rather than structure.

**Skill folder:** `skills/digital-marketing-pro-validate-output/`
**Namespace:** `marketing`
