# ui:harness-writing

Designs and improves fuzzing harnesses for C/C++ and Rust. Covers mapping raw bytes onto a target API, generating structured inputs, avoiding non-determinism and false crashes, and deciding what to fuzz together. Use when writing a first LLVMFuzzerTestOneInput or fuzz_target! harness, when a campaign finds nothing or reports crashes that will not reproduce, or when the target API needs structured rather than raw input.

**Skill folder:** `skills/skills-harness-writing/`
**Namespace:** `ui`
