import { mkdtemp, mkdir, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'vite';
import { expect, it, vi } from 'vitest';
import { generateBlocksPlugin } from '../src/storybook.tsx';

it('rebuilds embedded manifests on nested source additions, edits and deletions', async function watchesSources() {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'block-explorer-watch-')));
  const directory = join(root, 'blocks/fixture-block');
  const component = join(root, 'components/field');
  const marker = '<Block id="fixture-block" of={Stories.Preview} />';
  await mkdir(directory, { recursive: true });
  await mkdir(component, { recursive: true });
  await writeFile(join(directory, 'README.mdx'), marker);
  await writeFile(join(root, 'blocks/README.mdx'), marker);
  await writeFile(join(component, 'README.mdx'), '<BlockLink id="fixture-block" />');
  await writeFile(join(directory, 'index.tsx'), 'export const initial = true;');
  const transformCounts = new Map<string, number>();

  const server = await createServer({
    configFile: false,
    root,
    cacheDir: join(root, '.vite'),
    logLevel: 'silent',
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, ws: false, fs: { allow: [root] }, watch: { usePolling: true, interval: 25 } },
    plugins: [
      generateBlocksPlugin(),
      {
        name: 'inspect-expanded-mdx',
        transform(source, id) {
          if (id.endsWith('.mdx')) {
            transformCounts.set(id, (transformCounts.get(id) ?? 0) + 1);
            return `export default ${JSON.stringify(source)};`;
          }
          return null;
        }
      }
    ]
  });

  try {
    const catalogUrl = '/blocks/README.mdx';
    const detailUrl = '/blocks/fixture-block/README.mdx';
    const linkUrl = '/components/field/README.mdx';
    expect((await server.transformRequest(catalogUrl))?.code).toContain('initial');
    expect((await server.transformRequest(detailUrl))?.code).toContain('initial');
    const linkResult = await server.transformRequest(linkUrl);
    await vi.waitFor(() => expect(server.watcher.getWatched()[directory]).toContain('index.tsx'));

    const nestedDirectory = join(directory, 'new/nested');
    const addedFile = join(nestedDirectory, 'added.ts');
    await mkdir(nestedDirectory, { recursive: true });
    await writeFile(addedFile, 'export const added = "first version";');
    await vi.waitFor(
      async function assertAddedSource() {
        expect((await server.transformRequest(catalogUrl))?.code).toContain('new/nested/added.ts');
        expect((await server.transformRequest(detailUrl))?.code).toContain('new/nested/added.ts');
      },
      { timeout: 5000 }
    );
    expect((await server.transformRequest(linkUrl))?.code).toBe(linkResult?.code);

    await writeFile(addedFile, 'export const added = "updated version";');
    await vi.waitFor(async function assertUpdatedSource() {
      expect((await server.transformRequest(catalogUrl))?.code).toContain('updated version');
      expect((await server.transformRequest(detailUrl))?.code).toContain('updated version');
    });

    await rm(join(directory, 'new'), { recursive: true });
    await vi.waitFor(async function assertRemovedSource() {
      expect((await server.transformRequest(catalogUrl))?.code).not.toContain('new/nested/added.ts');
      expect((await server.transformRequest(detailUrl))?.code).not.toContain('new/nested/added.ts');
    });

    // Removing the marker must remove its directory subscriptions too.
    await writeFile(join(root, 'blocks/README.mdx'), '# No explorer');
    await vi.waitFor(async function assertRemovedMarker() {
      expect((await server.transformRequest(catalogUrl))?.code).toContain('# No explorer');
    });
    const catalogTransforms = transformCounts.get(join(root, 'blocks/README.mdx'));
    await writeFile(join(directory, 'index.tsx'), 'export const latest = true;');
    await vi.waitFor(async function assertLatestSource() {
      expect((await server.transformRequest(detailUrl))?.code).toContain('latest');
    });
    await server.transformRequest(catalogUrl);
    expect(transformCounts.get(join(root, 'blocks/README.mdx'))).toBe(catalogTransforms);
    expect((await server.transformRequest(linkUrl))?.code).toBe(linkResult?.code);
  } finally {
    await server.close();
    await rm(root, { recursive: true, force: true });
  }
}, 20000);
