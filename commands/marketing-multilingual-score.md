# marketing:multilingual-score

Score translated or localized content into one composite quality verdict — technical translation scoring (length ratio, formatting, do-not-translate terms, placeholders), content quality in the target language, brand voice consistency, and target-market compliance — classified as Publish Ready (85+), Native Speaker Review (70-84), or Re-translate (below 70) with specific, located fix suggestions per issue. Triggers on \"/digital-marketing-pro:multilingual-score\", \"is this German translation ready to publish\", \"score this localized landing page\", \"did the translation keep our brand voice\", \"check compliance on the Japanese version\". Runs the language-router, eval-runner, and brand-voice-scorer scripts, reads the brand profile's language config and do-not-translate list, and compares against the brand's multilingual baseline when past runs exist.

**Skill folder:** `skills/digital-marketing-pro-multilingual-score/`
**Namespace:** `marketing`
