# ai:coverage-analysis

Measures and interprets what a fuzzing campaign actually reaches, using llvm-cov, lcov, or a fuzzer's own coverage output. Covers baselining a new campaign, reading coverage reports, and turning uncovered regions into harness, seed, or dictionary work. Use when a fuzzer plateaus, when judging whether a harness is effective, after changing a harness, or when asking why some code is never reached.

**Skill folder:** `skills/skills-coverage-analysis/`
**Namespace:** `ai`
