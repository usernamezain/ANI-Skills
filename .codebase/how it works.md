# How It Works

## Lifecycle Workflows
1. **Bootstrap & Install:** `bin/install.js` runs to copy or symlink files to the corresponding user directories.
2. **Auto Detection:** `--auto` mode scans configuration environments (`~/.gemini`, `~/.cursor`, etc.) to run silently.
3. **Slash Commands:** The TOML configurations in `.gemini/commands/` register shortcuts in the AI CLI.
4. **Skills Ingestion:** Ingestion scripts copy and parse repository guides, wrapping them into the `ani:` namespace.
