import { mkdtemp, mkdir, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'vite';
import { expect, it, vi } from 'vitest';
import { generateBlocksPlugin } from '../src/storybook.tsx';

it('rebuilds embedded manifests on nested source additions, edits and deletions', async function watchesSources() {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'block-explorer-watch-')));
  const directory = join(root, 'blocks/fixture-block');
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'README.mdx'), '<Block id="fixture-block" of={Stories.Preview} />');
  await writeFile(join(directory, 'index.tsx'), 'export const initial = true;');

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
        name: 'mdx-as-string',
        transform(source, id) {
          return id.endsWith('.mdx') ? `export default ${JSON.stringify(source)};` : null;
        }
      }
    ]
  });

  // Assert only states that eventually hold; precise invalidation is covered by storybook.node.test.ts.
  async function expectDetail(assertion: (code: string | undefined) => void) {
    await vi.waitFor(async () => assertion((await server.transformRequest('/blocks/fixture-block/README.mdx'))?.code), {
      timeout: 5000
    });
  }

  // The plugin's watcher.add() rescans the block directory, and anything created during that rescan
  // counts as initial and emits nothing. Empty probe directories are ignored by both plugin and manifest.
  async function waitForLiveWatcher() {
    let detected = false;
    let attempt = 0;
    function onAddDir(path: string) {
      if (path.startsWith(join(directory, '.watch-probe-'))) detected = true;
    }
    server.watcher.on('addDir', onAddDir);
    try {
      await vi.waitFor(
        async function probeWatcher() {
          if (!detected) await mkdir(join(directory, `.watch-probe-${attempt++}`));
          expect(detected).toBe(true);
        },
        { timeout: 5000, interval: 100 }
      );
    } finally {
      server.watcher.off('addDir', onAddDir);
    }
  }

  try {
    await expectDetail((code) => expect(code).toContain('initial'));
    await waitForLiveWatcher();

    const nestedDirectory = join(directory, 'new/nested');
    const addedFile = join(nestedDirectory, 'added.ts');
    await mkdir(nestedDirectory, { recursive: true });
    await writeFile(addedFile, 'export const added = "first version";');
    await expectDetail((code) => expect(code).toContain('new/nested/added.ts'));

    await writeFile(addedFile, 'export const added = "updated version";');
    await expectDetail((code) => expect(code).toContain('updated version'));

    await rm(join(directory, 'new'), { recursive: true });
    await expectDetail((code) => expect(code).not.toContain('new/nested/added.ts'));
  } finally {
    await server.close();
    await rm(root, { recursive: true, force: true });
  }
}, 20000);
