import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { languageForPath, loadBlockManifest, resolveBlockDirectory } from '../src/node.ts';

const fixtureDirectory = resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/block');

describe('block manifest utilities', function blockManifestUtilities() {
  it('discovers implementation files and uses marker metadata', async function loadsManifest() {
    const manifest = await loadBlockManifest(fixtureDirectory, {
      id: 'fixture-block',
      description: 'A fixture used by the block explorer tests.'
    });

    expect(manifest).toMatchObject({
      id: 'fixture-block',
      description: 'A fixture used by the block explorer tests.',
      installCommand: 'npx shadcn@latest add godaddy/antares/blocks/fixture-block'
    });
    expect(manifest).not.toHaveProperty('title');
    expect(manifest.files).toEqual([
      { path: 'index.tsx', language: 'tsx', source: 'export function FixtureBlock() {\n  return null;\n}\n' },
      { path: 'nested/README.mdx', language: 'md', source: '# Nested README\n' },
      { path: 'styles/theme.css', language: 'css', source: ':root {\n  color: black;\n}\n' }
    ]);
  });

  it('reads a description from the block README when no override is provided', async function readsDescription() {
    await withTemporaryBlock(async function assertDescription(directory) {
      const manifest = await loadBlockManifest(directory, { id: 'temporary-block' });

      expect(manifest.description).toBe('Temporary block description.');
    });
  });

  it('preserves deterministic paths and normalizes source line endings', async function normalizesSource() {
    const manifest = await loadBlockManifest(fixtureDirectory, { id: 'fixture-block' });

    expect(
      manifest.files.map(function getPath(file) {
        return file.path;
      })
    ).toEqual(['index.tsx', 'nested/README.mdx', 'styles/theme.css']);
    expect(
      manifest.files.every(function hasUnixLineEndings(file) {
        return !file.source.includes('\r');
      })
    ).toBe(true);
  });

  it('resolves a README to its local block directory', async function resolvesDirectory() {
    await expect(resolveBlockDirectory(resolve(fixtureDirectory, 'README.mdx'), 'fixture-block')).resolves.toBe(
      fixtureDirectory
    );
  });

  it('resolves a block from a package-level blocks directory', async function resolvesPackageBlock() {
    const readmePath = resolve(fixtureDirectory, '../package/components/example/README.mdx');
    const blockDirectory = resolve(fixtureDirectory, '../package/blocks/fixture-block');

    await expect(resolveBlockDirectory(readmePath, 'fixture-block')).resolves.toBe(blockDirectory);
  });

  it('reports an unresolved block id with the source README path', async function rejectsUnknownBlock() {
    await expect(resolveBlockDirectory(resolve(fixtureDirectory, 'README.mdx'), 'missing-block')).rejects.toThrow(
      `${fixtureDirectory}/README.mdx: unable to resolve block "missing-block".`
    );
  });

  it('ignores directories while discovering regular source files', async function ignoresDirectories() {
    await withTemporaryBlock(async function assertFiles(directory) {
      await mkdir(resolve(directory, 'styles'));
      const manifest = await loadBlockManifest(directory, { id: 'temporary-block' });

      expect(manifest.files.map((file) => file.path)).toEqual(['index.tsx']);
    });
  });

  it('omits the root test directory from block source files', async function omitsTests() {
    await withTemporaryBlock(async function assertFiles(directory) {
      await mkdir(resolve(directory, 'test'));
      await writeFile(resolve(directory, 'test/block.node.test.tsx'), 'export {};\n');
      const manifest = await loadBlockManifest(directory, { id: 'temporary-block' });

      expect(manifest.files.map((file) => file.path)).toEqual(['index.tsx']);
    });
  });

  it('maps supported extensions to documentation languages', function mapsLanguages() {
    expect(languageForPath('component.tsx')).toBe('tsx');
    expect(languageForPath('data.ts')).toBe('ts');
    expect(languageForPath('styles.css')).toBe('css');
    expect(languageForPath('data.json')).toBe('json');
    expect(languageForPath('README.mdx')).toBe('md');
    expect(languageForPath('README')).toBe('md');
    expect(languageForPath('COMPONENT.TSX')).toBe('tsx');
  });
});

async function withTemporaryBlock(callback: (directory: string) => Promise<void>) {
  const directory = await mkdtemp(join(tmpdir(), 'block-explorer-'));

  try {
    await writeFile(
      resolve(directory, 'README.mdx'),
      '<Block id="temporary-block" description="Temporary block description." />\n'
    );
    await writeFile(resolve(directory, 'index.tsx'), 'export {}\n');
    await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
