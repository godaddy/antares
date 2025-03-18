import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import pkg from '../package.json' with { type: 'json' };
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, '..', '..', '..');
const folders = readdirSync(join(root, 'packages'));
const aliases: Record<string, string> = {};

folders.forEach(function eachFolder(folder) {
  try {
    const packageJson = join(root, 'packages', folder, 'package.json');
    const contents = readFileSync(packageJson, 'utf-8');
    const data = JSON.parse(contents);

    aliases[data.name] = '*';
  } catch {
    return;
  }
});

//
// Introduce the missing aliases to the `dependencies` object.
//
for (const key in aliases) {
  if ((pkg as any).dependencies[key]) continue;
  (pkg as any).dependencies[key] = aliases[key];
}

//
// Sort the `dependencies` object alphabetically.
//
(pkg as any).dependencies = Object.keys(pkg.dependencies)
  .sort()
  .reduce(
    (acc, key) => ({
      ...acc,
      [key]: pkg.dependencies[key]
    }),
    {}
  );

//
// Write the updated `package.json` file.
//
writeFileSync(join(__dirname, '..', 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
