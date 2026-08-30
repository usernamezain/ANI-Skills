# ai:address-sanitizer

Builds and runs code under AddressSanitizer to catch buffer overflows, use-after-free, and other memory errors during fuzzing or tests. Covers -fsanitize=address builds, ASAN_OPTIONS, reading the crash report, LeakSanitizer, and the overhead and platform trade-offs. Use when fuzzing C/C++ or Rust that has unsafe blocks or FFI, when debugging a memory corruption crash, or when reading an ASan stack trace.

**Skill folder:** `skills/skills-address-sanitizer/`
**Namespace:** `ai`
