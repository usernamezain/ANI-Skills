# ai:verify-product-image

QC gate for a generated static ad image — verify the file opens, matches the requested dimensions, shows the correct product/subject (right shape, colour, label, logo), and has no garbled text or severe artifacts. Records pass/fail/needs-human in verification.md. Used as the final check in the static ad remix flow before shipping.

**Skill folder:** `skills/goose-skills-verify-product-image/`
**Namespace:** `ai`
