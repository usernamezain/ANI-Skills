# plan:fuzzing-dictionary

Builds and applies fuzzing dictionaries so a fuzzer can produce the keywords, magic bytes, and tokens a target expects. Covers extracting tokens from source, headers, binaries, and specifications, dictionary syntax, and wiring one into libFuzzer or AFL++. Use when fuzzing a parser, protocol, or file format, when coverage stalls at input validation, or when a target compares against fixed strings.

**Skill folder:** `skills/skills-fuzzing-dictionary/`
**Namespace:** `plan`
