import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
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

  it('normalizes CRLF source to Unix line endings', async function normalizesSource() {
    await withTemporaryBlock(async function assertNormalizedSource(directory) {
      await writeFile(resolve(directory, 'index.tsx'), 'export function Example() {\r\n  return null;\r\n}\r\n');

      const manifest = await loadBlockManifest(directory, { id: 'temporary-block' });

      expect(manifest.files[0]?.source).toBe('export function Example() {\n  return null;\n}\n');
    });
  });

  it.each([
    '\n',
    '\r\n'
  ])('reads matching live metadata with %j line endings', async function readsLiveMetadata(newline) {
    await withTemporaryBlock(async function assertLiveMetadata(directory) {
      const readmePath = resolve(directory, 'README.mdx');
      await writeFile(
        readmePath,
        [
          '---',
          'title: >-',
          '  <Block id="temporary-block" description="YAML example" />',
          '---',
          '',
          '```mdx',
          '<Block id="temporary-block" description="Fenced example" />',
          '```',
          '',
          '{/* <Block id="temporary-block" description="Comment" /> */}',
          '',
          'Use `<Block id="temporary-block" description="Inline example" />`.',
          '',
          '<BlockLink id="temporary-block" />',
          '',
          '<Block id="another-block" description="Another block" />',
          '',
          '<Block',
          '  id = "temporary-block"',
          '  description = "Live description"',
          '  of={Stories.Preview}',
          '/>',
          '',
          '<Block id="temporary-block" description="Later description" />'
        ].join(newline)
      );

      await expect(resolveBlockDirectory(readmePath, 'temporary-block')).resolves.toBe(directory);
      await expect(loadBlockManifest(directory, { id: 'temporary-block' })).resolves.toMatchObject({
        description: 'Live description'
      });
      await expect(
        loadBlockManifest(directory, { id: 'temporary-block', description: 'Override' })
      ).resolves.toMatchObject({
        description: 'Override'
      });
    });
  });

  it.each([
    '<BlockLink id="temporary-block" />',
    '```mdx\n<Block id="temporary-block" />\n```',
    '{/* <Block id="temporary-block" /> */}'
  ])('does not treat references or examples as a local definition: %s', async function rejectsNonDefinitions(source) {
    await withTemporaryBlock(async function assertNonDefinition(directory) {
      const readmePath = resolve(directory, 'README.mdx');
      await writeFile(readmePath, source);
      await expect(resolveBlockDirectory(readmePath, 'temporary-block')).rejects.toThrow('unable to resolve block');
      expect((await loadBlockManifest(directory, { id: 'temporary-block' })).description).toBeUndefined();
    });
  });

  it('allows a missing README without losing implementation files', async function allowsMissingReadme() {
    await withTemporaryBlock(async function assertMissingReadme(directory) {
      await rm(resolve(directory, 'README.mdx'));
      const manifest = await loadBlockManifest(directory);
      expect(manifest.description).toBeUndefined();
      expect(manifest.files.map((file) => file.path)).toEqual(['index.tsx']);
    });
  });

  it('reports invalid MDX with its README path', async function rejectsInvalidMdx() {
    await withTemporaryBlock(async function assertInvalidMdx(directory) {
      const readmePath = resolve(directory, 'README.mdx');
      await writeFile(readmePath, '<Block id="temporary-block"');
      await expect(loadBlockManifest(directory)).rejects.toThrow(readmePath);
      await expect(resolveBlockDirectory(readmePath, 'temporary-block')).rejects.toThrow(readmePath);
    });
  });

  it('propagates README read and candidate stat failures', async function propagatesReadmeFailures() {
    await withTemporaryBlock(async function assertReadmeFailures(directory) {
      const readmePath = resolve(directory, 'README.mdx');
      await rm(readmePath);
      await symlink('README.mdx', readmePath);
      await expect(loadBlockManifest(directory)).rejects.toMatchObject({ code: 'ELOOP' });
      await expect(resolveBlockDirectory(readmePath, 'temporary-block')).rejects.toMatchObject({ code: 'ELOOP' });
      await symlink('broken', resolve(directory, 'broken'));
      await expect(resolveBlockDirectory(readmePath, 'broken')).rejects.toMatchObject({ code: 'ELOOP' });
    });
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

  it.each([
    '',
    '.',
    '..',
    '../../blocks/fixture-block',
    'nested/block',
    'nested\\block',
    '/absolute/block',
    'invalid block',
    'SignInForm',
    'sign_in_form',
    '-block',
    'block-',
    'block--name',
    'block\n'
  ])('rejects invalid block id %j', async function rejectsInvalidBlockId(id) {
    const readmePath = resolve(fixtureDirectory, '../package/components/example/README.mdx');

    await expect(resolveBlockDirectory(readmePath, id)).rejects.toThrow(
      `${readmePath}: invalid block id ${JSON.stringify(id)}. Expected lowercase kebab-case, such as "sign-in-form".`
    );
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

/** Creates an isolated block and removes it after the assertion completes. */
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
