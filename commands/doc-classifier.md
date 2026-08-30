# doc:classifier

Classifies a single planning document as ADR, PRD, SPEC, DOC, or UNKNOWN. Extracts title, scope summary, and cross-references. Spawned in parallel by /antigravity:ingest-docs. Writes a JSON classification file and returns a one-line confirmation.

**Skill folder:** `skills/doc-classifier/`
**Namespace:** `doc`
