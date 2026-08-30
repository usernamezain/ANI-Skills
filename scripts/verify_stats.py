import os, re, json

skills_dir = r'C:\Users\SHABBIR TRADERS\Desktop\skills\skills'
toml_dir   = r'C:\Users\SHABBIR TRADERS\Desktop\skills\.gemini\commands'
index_path = r'C:\Users\SHABBIR TRADERS\Desktop\skills\skills_index.json'

namespaces = {}
stale = []

for root, dirs, files in os.walk(skills_dir):
    if 'SKILL.md' not in files:
        continue
    rel = os.path.relpath(root, skills_dir)
    if any(p.startswith('.') for p in rel.split(os.sep)):
        continue
    fp = os.path.join(root, 'SKILL.md')
    with open(fp, 'r', encoding='utf-8-sig') as f:
        content = f.read(500)
    m = re.search(r'^name:\s*(.+)', content, re.MULTILINE)
    name = m.group(1).strip() if m else ''
    if ':' in name:
        ns = name.split(':')[0]
        namespaces[ns] = namespaces.get(ns, 0) + 1
    else:
        stale.append((rel, name))

print('=== NAMESPACE DISTRIBUTION ===')
for ns, count in sorted(namespaces.items(), key=lambda x: -x[1]):
    label = ns + ':'
    print('  {:14s} {} skills'.format(label, count))

total = sum(namespaces.values())
print('\n  Total namespaced: ' + str(total))
print('  Stale/unmapped:   ' + str(len(stale)))
if stale:
    for s, n in stale[:10]:
        print('    ! ' + s + '  name=' + n)

toml_count = len([f for f in os.listdir(toml_dir) if f.endswith('.toml')])
print('\n=== TOML COMMANDS: ' + str(toml_count) + ' files ===')

with open(index_path, 'r', encoding='utf-8') as f:
    index = json.load(f)
print('=== INDEX: ' + str(len(index)) + ' entries ===')
print('\nSample entries:')
for e in index[:5]:
    print('  ' + e['name'])
