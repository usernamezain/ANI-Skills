# ai:venice-augment

Venice augmentation endpoints for agent pipelines. Covers POST /augment/text-parser (extract text from PDF/DOCX/XLSX/plain text, multipart, up to 25MB, JSON or plain text response), POST /augment/scrape (fetch a URL and return markdown; blocks X/Reddit), and POST /augment/search (Brave ZDR or anonymized Google; structured title/url/content/date results, up to 20 per query). Privacy (zero data retention), rate limits, and error shapes.

**Skill folder:** `skills/venice-skills-venice-augment/`
**Namespace:** `ai`
