# db:wycheproof

Validates cryptographic implementations against Project Wycheproof's test vectors, which encode known attacks and edge cases across AES, RSA, ECDSA, ECDH, and more. Covers loading test vectors, mapping result flags onto pass and fail expectations, and reading a failure. Use when testing a crypto implementation against known attacks, checking a library against standard test vectors, or investigating why two implementations disagree on the same input.

**Skill folder:** `skills/skills-wycheproof/`
**Namespace:** `db`
