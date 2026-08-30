# marketing:prompt-test

A/B test content variations by quality score: create a named test, log each variant (scored via eval-runner.py on hallucination, content quality, and readability), and get a winner declaration with margin of victory, confidence level, per-dimension trade-offs, and auto-reject flags. Produces a decision-ready recommendation plus reusable insights about which approach wins for this brand. Triggers on \"/digital-marketing-pro:prompt-test\", \"which headline style works better\", \"A/B test these subject lines\", \"compare two versions of this copy\", \"show the results of my content test\". Reads the brand profile and guidelines for evaluation context; compares eval scores, not live audience performance — pair with /digital-marketing-pro:ab-test-plan for real-traffic experiments.

**Skill folder:** `skills/digital-marketing-pro-prompt-test/`
**Namespace:** `marketing`
