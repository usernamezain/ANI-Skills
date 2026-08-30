# doc:synthesizer

Synthesizes classified planning docs into a single consolidated context. Applies precedence rules, detects cross-ref cycles, enforces LOCKED-vs-LOCKED hard-blocks, and writes INGEST-CONFLICTS.md with three buckets (auto-resolved, competing-variants, unresolved-blockers). Spawned by /antigravity:ingest-docs.

**Skill folder:** `skills/doc-synthesizer/`
**Namespace:** `doc`
