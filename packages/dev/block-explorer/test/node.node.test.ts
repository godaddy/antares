import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { languageForPath, loadBlockManifest, resolveBlockDirectory } from '../src/node.ts';

const fixtureDirectory = resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/block');

describe('block manifest utilities', function blockManifestUtilities() {
  it('loads curated source files and infers their languages', async function loadsManifest() {
    const manifest = await loadBlockManifest(fixtureDirectory);

    expect(manifest).toMatchObject({
      id: 'fixture-block',
      title: 'Fixture block'
    });
    expect(manifest.files).toEqual([
      { path: 'index.tsx', language: 'tsx', source: 'export function FixtureBlock() {\n  return null;\n}\n' },
      { path: 'styles/theme.css', language: 'css', source: ':root {\n  color: black;\n}\n' }
    ]);
  });

  it('preserves manifest order and normalizes source line endings', async function normalizesSource() {
    const manifest = await loadBlockManifest(fixtureDirectory);

    expect(
      manifest.files.map(function getPath(file) {
        return file.path;
      })
    ).toEqual(['index.tsx', 'styles/theme.css']);
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

  it('rejects metadata that omits required fields', async function rejectsInvalidMetadata() {
    await withTemporaryManifest(
      { id: 'invalid-block', title: 'Invalid block' },
      async function assertInvalidManifest(directory) {
        await expect(loadBlockManifest(directory)).rejects.toThrow('expected id, title, and files');
      }
    );
  });

  it('rejects manifest paths that leave the block directory', async function rejectsUnsafePaths() {
    await withTemporaryManifest(
      {
        id: 'unsafe-block',
        title: 'Unsafe block',
        files: ['../index.tsx']
      },
      async function assertUnsafeManifest(directory) {
        await expect(loadBlockManifest(directory)).rejects.toThrow('must stay inside the block directory');
      }
    );
  });

  it('rejects duplicate curated source files', async function rejectsDuplicateFiles() {
    await withTemporaryManifest(
      {
        id: 'duplicate-block',
        title: 'Duplicate block',
        files: ['index.tsx', 'index.tsx']
      },
      async function assertDuplicateManifest(directory) {
        await writeFile(resolve(directory, 'index.tsx'), 'export {}\n');
        await expect(loadBlockManifest(directory)).rejects.toThrow('duplicate block file path');
      }
    );
  });

  it('rejects a curated directory instead of reading it as source', async function rejectsDirectories() {
    await withTemporaryManifest(
      {
        id: 'directory-block',
        title: 'Directory block',
        files: ['styles']
      },
      async function assertDirectoryManifest(directory) {
        await mkdir(resolve(directory, 'styles'));
        await expect(loadBlockManifest(directory)).rejects.toThrow('block file is not a file');
      }
    );
  });

  it('maps supported extensions to documentation languages', function mapsLanguages() {
    expect(languageForPath('component.tsx')).toBe('tsx');
    expect(languageForPath('data.ts')).toBe('ts');
    expect(languageForPath('styles.css')).toBe('css');
    expect(languageForPath('block.json')).toBe('json');
    expect(languageForPath('README.mdx')).toBe('md');
    expect(languageForPath('README')).toBe('md');
    expect(languageForPath('COMPONENT.TSX')).toBe('tsx');
  });
});

async function withTemporaryManifest(
  metadata: Record<string, unknown>,
  callback: (directory: string) => Promise<void>
) {
  const directory = await mkdtemp(join(tmpdir(), 'block-explorer-'));

  try {
    await writeFile(resolve(directory, 'block.json'), JSON.stringify(metadata));
    await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
