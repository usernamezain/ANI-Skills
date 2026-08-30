# api:tilegym-converting-cutile-to-julia

Converts cuTile Python GPU kernels (@ct.kernel) to cuTile.jl Julia equivalents. Handles kernel syntax translation, 0-indexed to 1-indexed conversion, broadcasting differences, memory layout (row-major to column-major), type system mapping, and launch API differences. Use when converting, porting, or translating cuTile Python kernels to Julia cuTile.jl, or debugging/optimizing existing Julia cuTile translations.

**Skill folder:** `skills/skills-tilegym-converting-cutile-to-julia/`
**Namespace:** `api`
