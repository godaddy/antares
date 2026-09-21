import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RegistryWriter } from '../build-registry.ts';

const { loadBlockManifest } = vi.hoisted(() => ({
  loadBlockManifest: vi.fn()
}));

vi.mock('../../packages/dev/block-explorer/src/node.ts', () => ({
  loadBlockManifest
}));

import { buildRegistry, createRegistry, writeRegistryItems } from '../build-registry.ts';

const temporaryDirectories: string[] = [];

describe('build-registry', function registryBuilderTests() {
  beforeEach(function resetManifestMock() {
    vi.clearAllMocks();
  });

  afterEach(async function removeTemporaryDirectories() {
    await Promise.all(
      temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true }))
    );
  });

  it('returns the registry envelope and maps manifest files to registry files', async function buildsOutput() {
    const blocksRoot = await createBlocksRoot([
      { id: 'zeta', title: 'Zeta block' },
      { id: 'alpha', title: '  Alpha block  ' }
    ]);
    const files = [
      { path: 'components/view.TSX' },
      { path: 'styles/theme.CSS' },
      { path: 'data.json' },
      { path: 'notes.mdx' },
      { path: 'types.ts' }
    ];
    loadBlockManifest.mockImplementation(async function mockManifest(
      _blockDirectory: string,
      overrides: { id: string }
    ) {
      return { id: overrides.id, description: undefined, installCommand: '', files };
    });

    const registry = await createRegistry(blocksRoot);

    expect(typeof registry.$schema).toBe('string');
    expect(typeof registry.name).toBe('string');
    expect(Array.isArray(registry.items)).toBe(true);
    expect(registry).toMatchObject({
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: 'antares-blocks'
    });
    expect(registry.items.map((item) => item.name)).toEqual(['blocks/alpha', 'blocks/zeta']);
    expect(registry.items[0]).toMatchObject({
      name: 'blocks/alpha',
      type: 'registry:block',
      title: 'Alpha block',
      dependencies: ['@godaddy/antares']
    });
    expect(Array.isArray(registry.items[0].dependencies)).toBe(true);
    expect(registry.items[0].files).toEqual([
      {
        path: 'alpha/components/view.TSX',
        type: 'registry:component',
        target: 'components/blocks/alpha/components/view.TSX'
      },
      {
        path: 'alpha/styles/theme.CSS',
        type: 'registry:style',
        target: 'components/blocks/alpha/styles/theme.CSS'
      },
      {
        path: 'alpha/data.json',
        type: 'registry:file',
        target: 'components/blocks/alpha/data.json'
      },
      {
        path: 'alpha/notes.mdx',
        type: 'registry:file',
        target: 'components/blocks/alpha/notes.mdx'
      },
      {
        path: 'alpha/types.ts',
        type: 'registry:component',
        target: 'components/blocks/alpha/types.ts'
      }
    ]);
    expect(loadBlockManifest).toHaveBeenCalledWith(join(blocksRoot, 'alpha'), { id: 'alpha' });
    expect(loadBlockManifest).toHaveBeenCalledWith(join(blocksRoot, 'zeta'), { id: 'zeta' });
  });

  it('only discovers directories with a regular README.mdx', async function filtersBlockCandidates() {
    const blocksRoot = await createBlocksRoot([{ id: 'valid', title: 'Valid block' }]);
    await mkdir(join(blocksRoot, 'without-readme'));
    await writeFile(join(blocksRoot, 'root-file.txt'), 'not a block');
    loadBlockManifest.mockResolvedValue({ files: [] });

    const registry = await createRegistry(blocksRoot);

    expect(registry.items.map((item) => item.name)).toEqual(['blocks/valid']);
    expect(loadBlockManifest).toHaveBeenCalledOnce();
  });

  it('returns an empty item list when no blocks are present', async function buildsEmptyRegistry() {
    const blocksRoot = await createBlocksRoot();

    await expect(createRegistry(blocksRoot)).resolves.toMatchObject({
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: 'antares-blocks',
      items: []
    });
    expect(loadBlockManifest).not.toHaveBeenCalled();
  });

  it.each([
    ['missing YAML frontmatter', '# Missing metadata\n', 'missing YAML frontmatter.'],
    ['invalid YAML', '---\ntitle: [\n---\n', 'invalid YAML frontmatter:'],
    ['missing title', '---\ndescription: Only a description\n---\n', 'missing frontmatter title.'],
    ['non-string title', '---\ntitle: 42\n---\n', 'missing frontmatter title.'],
    ['blank title', '---\ntitle: "  "\n---\n', 'missing frontmatter title.']
  ])('rejects %s metadata', async function rejectsInvalidMetadata(_caseName, readme, expectedMessage) {
    const blocksRoot = await createBlocksRoot([{ id: 'invalid', readme }]);

    await expect(createRegistry(blocksRoot)).rejects.toThrow(`invalid/README.mdx: ${expectedMessage}`);
    expect(loadBlockManifest).not.toHaveBeenCalled();
  });

  it('propagates manifest discovery failures', async function propagatesManifestFailure() {
    const blocksRoot = await createBlocksRoot([{ id: 'broken', title: 'Broken block' }]);
    const manifestError = new Error('manifest discovery failed');
    loadBlockManifest.mockRejectedValue(manifestError);

    await expect(createRegistry(blocksRoot)).rejects.toBe(manifestError);
  });

  it('writes serialized JSON through the injected registry writer', async function writesRegistry() {
    const blocksRoot = await createBlocksRoot([{ id: 'alpha', title: 'Alpha block' }]);
    loadBlockManifest.mockResolvedValue({ files: [] });
    const writeRegistry = vi.fn<RegistryWriter>().mockResolvedValue(undefined);

    const registry = await buildRegistry({
      blocksRoot,
      registryPath: '/tmp/generated-registry.json',
      writeRegistry
    });

    expect(writeRegistry).toHaveBeenCalledOnce();
    expect(writeRegistry).toHaveBeenCalledWith('/tmp/generated-registry.json', expect.any(String));
    const source = writeRegistry.mock.calls[0][1];
    expect(source.endsWith('\n')).toBe(true);
    expect(source).toContain('"dependencies": ["@godaddy/antares"]');
    expect(JSON.parse(source)).toEqual(registry);
  });

  it('writes individual registry item files for hosted installation', async function writesRegistryItems() {
    const blocksRoot = await createBlocksRoot([{ id: 'alpha', title: 'Alpha block' }]);
    loadBlockManifest.mockResolvedValue({ files: [] });
    const outputDirectory = await mkdtemp(join(tmpdir(), 'registry-items-'));

    const registry = await createRegistry(blocksRoot);
    await writeRegistryItems(registry, outputDirectory);

    const source = await readFile(join(outputDirectory, 'blocks/alpha.json'), 'utf8');
    expect(JSON.parse(source)).toEqual({
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      ...registry.items[0]
    });
  });

  it('does not write when registry creation fails', async function doesNotWriteAfterBuildFailure() {
    const blocksRoot = await createBlocksRoot([{ id: 'broken', title: 'Broken block' }]);
    const manifestError = new Error('manifest discovery failed');
    loadBlockManifest.mockRejectedValue(manifestError);
    const writeRegistry = vi.fn<RegistryWriter>().mockResolvedValue(undefined);

    await expect(
      buildRegistry({
        blocksRoot,
        registryPath: '/tmp/generated-registry.json',
        writeRegistry
      })
    ).rejects.toBe(manifestError);
    expect(writeRegistry).not.toHaveBeenCalled();
  });

  it('propagates registry writer failures', async function propagatesWriterFailure() {
    const blocksRoot = await createBlocksRoot([{ id: 'alpha', title: 'Alpha block' }]);
    loadBlockManifest.mockResolvedValue({ files: [] });
    const writerError = new Error('registry cannot be written');
    const writeRegistry = vi.fn<RegistryWriter>().mockRejectedValue(writerError);

    await expect(
      buildRegistry({
        blocksRoot,
        registryPath: '/tmp/generated-registry.json',
        writeRegistry
      })
    ).rejects.toBe(writerError);
  });
});

interface TemporaryBlock {
  id: string;
  title?: string;
  readme?: string;
}

async function createBlocksRoot(blocks: TemporaryBlock[] = []) {
  const blocksRoot = await mkdtemp(join(tmpdir(), 'registry-builder-'));
  temporaryDirectories.push(blocksRoot);

  await Promise.all(blocks.map((block) => writeBlock(blocksRoot, block)));

  return blocksRoot;
}

async function writeBlock(blocksRoot: string, block: TemporaryBlock) {
  const blockDirectory = join(blocksRoot, block.id);
  await mkdir(blockDirectory, { recursive: true });
  await writeFile(join(blockDirectory, 'README.mdx'), block.readme ?? `---\ntitle: ${block.title}\n---\n`);
}
