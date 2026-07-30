import { parser } from './resolver.js';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { globSync, readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import dtcg from '@godaddy/design-tokens/dtcg.json' with { type: 'json' };

const expectedTokens = new Set(Object.keys(dtcg));

/**
 * Collects token IDs from _ prefixed files so they can be excluded from output.
 * @param {string} srcDir - Absolute path to the source directory.
 * @param {string} path - Relative path to a _ prefixed JSON file.
 * @returns {string[]} Token IDs defined in the file.
 */
function getPartialTokenIds(srcDir: string, path: string) {
  const content = JSON.parse(readFileSync(resolve(srcDir, path), 'utf8'));
  return Object.keys(content);
}

/**
 * Returns relative paths to all buildable JSON entries, excluding _ prefixed files.
 * @param {string} srcDir - Absolute path to the source directory.
 * @returns {string[]} Array of relative paths from the src directory.
 */
function getEntries(srcDir: string) {
  return globSync('**/*.json', {
    cwd: srcDir,
    exclude: ['**/_*/**', '**/_*.json']
  });
}

/**
 * Ensures every token defined in @godaddy/design-tokens is present in the resolved set.
 * @param {string} entry - Relative path of the entry being validated.
 * @param {Record<string, unknown>} tokens - Resolved token map to validate.
 * @throws {Error} If any expected tokens are missing.
 */
function validateTokenCoverage(entry: string, tokens: Record<string, unknown>) {
  const themeTokenIds = new Set(Object.keys(tokens));
  const missing = [...expectedTokens].filter(function isMissing(id) {
    return !themeTokenIds.has(id);
  });

  if (missing.length) {
    throw new Error(`Token mismatch in ${entry}:\n  Missing (${missing.length}): ${missing.join(', ')}`);
  }
}

/**
 * Builds CSS output from DTCG token source files.
 * @param {string} srcDir - Absolute path to the source directory containing token JSON files.
 * @param {string} distDir - Absolute path to the output directory for generated CSS.
 */
export async function build(srcDir: string, distDir: string) {
  const partialTokenIds = new Set(
    globSync('**/_*.json', { cwd: srcDir }).flatMap(function collectIds(p) {
      return getPartialTokenIds(srcDir, p);
    })
  );

  await register(StyleDictionary);

  for (const entry of getEntries(srcDir)) {
    const inputPath = resolve(srcDir, entry);
    const outputDir = resolve(distDir, dirname(entry));
    const cssFilename = basename(entry).replace(/\.json$/, '.css');

    const { sets } = await parser(inputPath);

    if (basename(entry) === 'index.json') {
      validateTokenCoverage(entry, sets);
    }

    await mkdir(outputDir, { recursive: true });

    const sd = new StyleDictionary({
      tokens: sets,
      usesDtcg: true,
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: `${outputDir}/`,
          files: [
            {
              destination: cssFilename,
              format: 'css/variables',
              filter: function excludePartials(token) {
                if (expectedTokens.has(token.name)) return true;
                return !partialTokenIds.has(token.name);
              },
              options: {
                outputReferences: false,
                selector: ['@scope', ':scope'],
                showFileHeader: false
              }
            }
          ]
        }
      }
    });

    await sd.buildAllPlatforms();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = resolve(import.meta.dirname, '..');
  await build(resolve(root, 'src'), resolve(root, 'dist'));
}
