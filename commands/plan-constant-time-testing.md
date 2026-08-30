# plan:constant-time-testing

Measures timing side channels in cryptographic implementations by running them, using dudect for statistical analysis and Timecop over Valgrind for dynamic tracing. Covers the formal, symbolic, dynamic, and statistical tool categories and how to read a result. Use when testing whether a running implementation is constant-time, measuring timing variance on a compiled binary, or investigating a suspected timing attack. Not for statically inspecting compiler output — the constant-time-analysis plugin covers that.

**Skill folder:** `skills/skills-constant-time-testing/`
**Namespace:** `plan`
