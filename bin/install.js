#!/usr/bin/env node
/**
 * Antigravity Skills Library Installer
 * Interactive CLI helper to target environments.
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const projectRoot = path.dirname(__dirname);
const skillsSrc = path.join(projectRoot, 'skills');
const commandsSrc = path.join(projectRoot, 'commands');

function showBanner() {
  console.clear();
  console.log(`
==================================================
        ANTIGRAVITY SKILLS LIBRARY SETUP          
==================================================
A repository of 444 AI agent skills and prompts.
  `);
}

function shouldLink() {
  const isGit = fs.existsSync(path.join(projectRoot, '.git'));
  const isNodeModules = projectRoot.includes('node_modules');
  const isNpx = projectRoot.includes('npm-cache') || projectRoot.includes('_npx');
  return isGit && !isNodeModules && !isNpx;
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    try {
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      fs.copyFileSync(src, dest);
    } catch (e) {
      try {
        fs.chmodSync(dest, 0o666);
        if (fs.existsSync(dest)) {
          fs.unlinkSync(dest);
        }
        fs.copyFileSync(src, dest);
      } catch (err) {
        console.error(`[Warning] Failed to copy ${src} to ${dest}: ${err.message}`);
      }
    }
  }
}

function linkOrCopy(src, dest) {
  let pathExists = false;
  let isSymlinkOrFile = false;
  
  try {
    const stat = fs.lstatSync(dest);
    pathExists = true;
    isSymlinkOrFile = stat.isSymbolicLink() || stat.isFile();
  } catch (e) {
    // Path does not exist at all
  }

  if (pathExists) {
    try {
      if (isSymlinkOrFile) {
        fs.unlinkSync(dest);
      } else {
        fs.rmSync(dest, { recursive: true, force: true });
      }
    } catch (e) {
      console.log(`Note: overwriting existing target ${dest} failed: ${e.message}`);
    }
  }

  // Create parent directories if they don't exist
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (shouldLink()) {
    try {
      // Try junction link on Windows, symlink on other platforms
      const type = process.platform === 'win32' ? 'junction' : 'dir';
      fs.symlinkSync(src, dest, type);
      console.log(`[Success] Symlinked ${src} -> ${dest}`);
      return;
    } catch (e) {
      console.log(`[Permission Warning] Symlinking failed. Falling back to direct copying...`);
    }
  }

  try {
    copyRecursiveSync(src, dest);
    console.log(`[Success] Copied ${src} -> ${dest}`);
  } catch (copyErr) {
    console.error(`[Error] Copy failed: ${copyErr.message}`);
  }
}

function configureEnvironment(envName, skillsDest, commandsDests) {
  console.log(`\nConfiguring ${envName} targets...`);
  
  // Link or copy skills folder
  linkOrCopy(skillsSrc, skillsDest);
  
  // Link custom commands folder if provided
  if (commandsDests) {
    const geminiConfSrc = path.join(projectRoot, '.gemini', 'commands');
    const dests = Array.isArray(commandsDests) ? commandsDests : [commandsDests];
    dests.forEach(dest => {
      linkOrCopy(geminiConfSrc, dest);
    });
  }
  
  console.log(`${envName} skills and commands configured successfully.`);
  rl.question('\nPress Enter to return to main menu...', () => mainMenu());
}

function generateRules() {
  console.log('\nGenerating IDE Rules files for all AI agents...');
  const ruleContent = `# Custom Agent Instructions: Antigravity Skills Library

You are connected to the Antigravity Agent Skills Library containing 444 professional capabilities (visual scrollytelling, browser scraping/testing, planning workflows, and algorithmic DSA).

## Skill Registry Path
The skills registry is located in the local directory:
./skills/

## Execution Policy
1. When asked to construct creative layouts (parallax, custom cursors, smooth scroll, 120fps cards), read the instructions in \`skills/<name>/SKILL.md\` and review its working code details in \`skills/<name>/references/index.html\`.
2. When asked to perform web scraping, UI automation, or framework testing (Puppeteer, Playwright, Selenium, Cypress), consult \`skills/<name>-skill/SKILL.md\` and its test/scraping setup files.
3. When asked to solve DSA problems, consult \`skills/dsa-<name>/SKILL.md\` for optimized algorithm complexity benchmarks and template structures in Python/JS.
4. Coordinate multiple skills by consulting the master templates under \`boss-prompts/\`.

## ANI Coding & Safety Standards (for ani-skills edits)
Whenever modifying files inside the ANI orchestrator (under \`ani-skills/\` or \`ani-core/\`):
1. **CommonJS only**: Use \`require()\`, never \`import\`.
2. **No external dependencies in core**: Only Node.js built-ins.
3. **Test framework**: Use \`node:test\` and \`node:assert\` ONLY.
4. **File extensions**: Use \`.cjs\` for all test and lib files.
5. **Safety**: Use \`execFileSync\` (array args) instead of \`execSync\`. Validate user paths using \`validatePath()\` from \`ani-skills/bin/lib/security.cjs\`.
`;

  try {
    fs.writeFileSync(path.join(process.cwd(), '.cursorrules'), ruleContent);
    fs.writeFileSync(path.join(process.cwd(), '.windsurfrules'), ruleContent);
    fs.writeFileSync(path.join(process.cwd(), '.traerules'), ruleContent);
    fs.writeFileSync(path.join(process.cwd(), '.clinerules'), ruleContent);
    fs.writeFileSync(path.join(process.cwd(), '.geminirules'), ruleContent);
    console.log(`[Success] Wrote rules files for Cursor (.cursorrules), Windsurf (.windsurfrules), Trae (.traerules), Clinerules (.clinerules), and Gemini (.geminirules).`);
  } catch (e) {
    console.error(`[Error] Failed to write rule files: ${e.message}`);
  }
  rl.question('\nPress Enter to return to main menu...', () => mainMenu());
}

function localInstall() {
  console.log('\nCopying skills to current workspace directory...');
  const currentSkills = path.join(process.cwd(), 'skills');
  const currentCommands = path.join(process.cwd(), 'commands');
  const currentBoss = path.join(process.cwd(), 'boss-prompts');
  
  try {
    copyRecursiveSync(skillsSrc, currentSkills);
    copyRecursiveSync(commandsSrc, currentCommands);
    copyRecursiveSync(path.join(projectRoot, 'boss-prompts'), currentBoss);
    console.log(`[Success] Copied /skills, /commands, and /boss-prompts locally.`);
  } catch (e) {
    console.error(`[Error] Copy failed: ${e.message}`);
  }
  rl.question('\nPress Enter to return to main menu...', () => mainMenu());
}

function compileIndex() {
  console.log('\nCompiling skills index...');
  try {
    const updateScript = path.join(projectRoot, 'scripts', 'update_skills_index.py');
    const output = execSync(`python "${updateScript}"`).toString();
    console.log(output);
  } catch (e) {
    console.error(`[Error] Failed to run update script: ${e.message}`);
  }
  rl.question('\nPress Enter to return to main menu...', () => mainMenu());
}

function mainMenu() {
  showBanner();
  const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
  console.log('Select your target configuration environment:');
  console.log(`[1] Configure for Antigravity IDE  ${path.join(homeDir, '.gemini', 'config')}`);
  console.log(`[2] Configure for Antigravity 2.0  ${path.join(homeDir, '.gemini', 'antigravity')}`);
  console.log(`[3] Configure for Claude Code CLI  ${path.join(homeDir, '.claude')}`);
  console.log(`[4] Configure for Trae             ${path.join(homeDir, '.trae')}`);
  console.log(`[5] Configure for Cursor           ${path.join(homeDir, '.cursor')}`);
  console.log(`[6] Configure for Kiro             ${path.join(homeDir, '.kiro')}`);
  console.log(`[7] Configure for Qoderworker      ${path.join(homeDir, '.qoderwork')}`);
  console.log(`[8] Configure for CodeBuddy        ${path.join(homeDir, '.codebuddy')}`);
  console.log(`[9] Configure for Cline            ${path.join(homeDir, '.cline')}`);
  console.log('[10] Generate IDE Rules files (.cursorrules / .clinerules / etc.)');
  console.log('[11] Copy all 444 skills and commands locally to current directory');
  console.log('[12] Compile / Update skills search index');
  console.log('[13] Exit');
  
  rl.question('\nEnter option (1-13): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        configureEnvironment(
          'Antigravity IDE',
          path.join(homeDir, '.gemini', 'config', 'skills'),
          [path.join(homeDir, '.gemini', 'commands'), path.join(homeDir, '.gemini', 'config', 'commands')]
        );
        break;
      case '2':
        configureEnvironment(
          'Antigravity 2.0',
          path.join(homeDir, '.gemini', 'antigravity', 'skills'),
          [path.join(homeDir, '.gemini', 'commands'), path.join(homeDir, '.gemini', 'antigravity', 'commands')]
        );
        break;
      case '3':
        configureEnvironment(
          'Claude Code CLI',
          path.join(homeDir, '.claude', 'skills'),
          null
        );
        break;
      case '4':
        configureEnvironment(
          'Trae',
          path.join(homeDir, '.trae', 'skills'),
          null
        );
        break;
      case '5':
        configureEnvironment(
          'Cursor',
          path.join(homeDir, '.cursor', 'skills'),
          null
        );
        break;
      case '6':
        configureEnvironment(
          'Kiro',
          path.join(homeDir, '.kiro', 'skills'),
          null
        );
        break;
      case '7':
        configureEnvironment(
          'Qoderworker',
          path.join(homeDir, '.qoderwork', 'skills'),
          null
        );
        break;
      case '8':
        configureEnvironment(
          'CodeBuddy',
          path.join(homeDir, '.codebuddy', 'skills'),
          null
        );
        break;
      case '9':
        configureEnvironment(
          'Cline',
          path.join(homeDir, '.cline', 'skills'),
          null
        );
        break;
      case '10':
        generateRules();
        break;
      case '11':
        localInstall();
        break;
      case '12':
        compileIndex();
        break;
      case '13':
        console.log('Setup completed. Enjoy your Antigravity Agent skills!');
        rl.close();
        process.exit(0);
        break;
      default:
        console.log('Invalid option. Please choose an option from 1 to 13.');
        rl.question('\nPress Enter to try again...', () => mainMenu());
        break;
    }
  });
}

function runAutoInstall() {
  console.log('Running Antigravity Skills Library Setup in Auto/Non-Interactive Mode...');
  const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
  
  const targets = [
    {
      name: 'Antigravity IDE',
      skillsDest: path.join(homeDir, '.gemini', 'config', 'skills'),
      commandsDests: [path.join(homeDir, '.gemini', 'commands'), path.join(homeDir, '.gemini', 'config', 'commands')],
      trigger: path.join(homeDir, '.gemini', 'config')
    },
    {
      name: 'Antigravity 2.0',
      skillsDest: path.join(homeDir, '.gemini', 'antigravity', 'skills'),
      commandsDests: [path.join(homeDir, '.gemini', 'commands'), path.join(homeDir, '.gemini', 'antigravity', 'commands')],
      trigger: path.join(homeDir, '.gemini', 'antigravity')
    },
    {
      name: 'Claude Code CLI',
      skillsDest: path.join(homeDir, '.claude', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.claude')
    },
    {
      name: 'Trae',
      skillsDest: path.join(homeDir, '.trae', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.trae')
    },
    {
      name: 'Cursor',
      skillsDest: path.join(homeDir, '.cursor', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.cursor')
    },
    {
      name: 'Kiro',
      skillsDest: path.join(homeDir, '.kiro', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.kiro')
    },
    {
      name: 'Qoderworker',
      skillsDest: path.join(homeDir, '.qoderwork', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.qoderwork')
    },
    {
      name: 'CodeBuddy',
      skillsDest: path.join(homeDir, '.codebuddy', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.codebuddy')
    },
    {
      name: 'Cline',
      skillsDest: path.join(homeDir, '.cline', 'skills'),
      commandsDests: null,
      trigger: path.join(homeDir, '.cline')
    }
  ];

  let configuredAny = false;

  targets.forEach(target => {
    if (fs.existsSync(target.trigger)) {
      console.log(`\nDetected environment: ${target.name}. Configuring targets...`);
      try {
        // Copy skills
        linkOrCopy(skillsSrc, target.skillsDest);
        
        // Copy commands
        if (target.commandsDests) {
          const geminiConfSrc = path.join(projectRoot, '.gemini', 'commands');
          const dests = Array.isArray(target.commandsDests) ? target.commandsDests : [target.commandsDests];
          dests.forEach(dest => {
            linkOrCopy(geminiConfSrc, dest);
          });
        }
        console.log(`[Success] Configured ${target.name} skills and commands.`);
        configuredAny = true;
      } catch (err) {
        console.error(`[Error] Failed configuring ${target.name}: ${err.message}`);
      }
    }
  });

  if (!configuredAny) {
    console.log('\nNo standard AI environment directories detected (like .gemini, .cursor, .claude, etc.).');
    console.log('Skipping auto configuration. To run interactively, run the script in a TTY terminal.');
  } else {
    console.log('\nAuto configuration completed successfully.');
  }
  
  rl.close();
  process.exit(0);
}

// Start execution
const args = process.argv.slice(2);
const isAuto = args.includes('--auto') || args.includes('--yes') || args.includes('-y') || !process.stdout.isTTY;

if (isAuto) {
  runAutoInstall();
} else {
  mainMenu();
}
