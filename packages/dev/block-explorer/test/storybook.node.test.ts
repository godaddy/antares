import { EventEmitter } from 'node:events';
import { resolve } from 'node:path';
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import { describe, expect, it, vi } from 'vitest';
import { generateBlocksPlugin, viteFinal } from '../src/storybook.tsx';

const fixtureReadme = resolve(import.meta.dirname, 'fixtures/fixture-block/README.mdx');
const noMarkerReadme = resolve(import.meta.dirname, 'fixtures/no-marker/README.mdx');
const componentReadme = resolve(import.meta.dirname, 'fixtures/package/components/example/README.mdx');
const importedReadme = resolve(import.meta.dirname, 'fixtures/package/components/imported/README.mdx');
const invalidBlockReadme = resolve(import.meta.dirname, 'fixtures/invalid-block/README.mdx');
const invalidLinkReadme = resolve(import.meta.dirname, 'fixtures/invalid-link/README.mdx');
const packageBlockDirectory = resolve(import.meta.dirname, 'fixtures/package/blocks/fixture-block');

describe('Storybook block explorer plugin', function storybookPluginTests() {
  it('skips non-README files and MDX without a block marker', async function skipsUnrelatedFiles() {
    const plugin = generateBlocksPlugin();

    await expect(runTransform(plugin, '# Guide', '/tmp/guide.mdx')).resolves.toBeNull();
    await expect(runTransform(plugin, '# Fixture without a block marker', noMarkerReadme)).resolves.toBeNull();
  });

  it('expands BlockLink with the Storybook overview route and watches only the target README', async function expandsBlockLink() {
    const plugin = generateBlocksPlugin();
    const addWatchFile = vi.fn();
    const result = await runTransform(plugin, '<BlockLink id="fixture-block" />', fixtureReadme, addWatchFile);

    expect(result).toContain('<a href={');
    expect(result).toContain('./?path=/docs/blocks-fixture-block--overview');
    expect(result).toContain('blocks-fixture-block--overview');
    expect(result).toContain('target="_top"');
    expect(result).not.toContain('BlockLinks');
    await expect(compile(result)).resolves.toBeDefined();
    expect(addWatchFile).toHaveBeenCalledWith(fixtureReadme);
    expect(addWatchFile).not.toHaveBeenCalledWith(expect.stringContaining('index.tsx'));
    expect(addWatchFile).not.toHaveBeenCalledWith(expect.stringContaining('styles/theme.css'));
  });

  it('expands inline links without changing surrounding prose', async function expandsInlineLinks() {
    const result = await runTransform(
      generateBlocksPlugin(),
      'See <BlockLink id="fixture-block" /> for an example.',
      componentReadme
    );
    expect(result).toMatch(/^See <a href=/);
    expect(result).toContain('target="_top"');
    expect(result).toMatch(/<\/a> for an example\.$/);
    await expect(compile(result)).resolves.toBeDefined();
  });

  it.each([
    { format: 'LF', newline: '\n' },
    { format: 'CRLF', newline: '\r\n' }
  ])(
    'expands Block after $format frontmatter and injects missing Storybook imports',
    async function expandsBlock({ newline }) {
      const frontmatter = ['---', 'title: Example component', '---', ''].join(newline);
      const result = await runTransform(
        generateBlocksPlugin(),
        `${frontmatter}<Block id="fixture-block" description="Fixture description." of={Stories.Preview} />`,
        componentReadme
      );

      expect(result?.startsWith(`${frontmatter}import { StorybookBlockExplorer }`)).toBe(true);
      expect(result).toContain('<StorybookBlockExplorer block={');
      expect(result).toContain('<Story of={Stories.Preview} inline />');
      expect(result).toContain("import { Story } from '@storybook/addon-docs/blocks';");
    }
  );

  it('expands Block without a description', async function expandsBlockWithoutDescription() {
    const result = await runTransform(
      generateBlocksPlugin(),
      '<Block id="fixture-block" of={Stories.Preview} />',
      componentReadme
    );

    expect(result).toContain('<StorybookBlockExplorer block=');
    expect(result).toContain('<Story of={Stories.Preview} inline />');
    await expect(compile(result)).resolves.toBeDefined();
  });

  it('expands every marker and accumulates imports and watch files', async function expandsMultipleMarkers() {
    const addWatchFile = vi.fn();
    const result = await runTransform(
      generateBlocksPlugin(),
      '<BlockLink id="fixture-block" />\n<Block id="fixture-block" of={Stories.Preview} />',
      componentReadme,
      addWatchFile
    );

    expect(result).not.toContain('<BlockLink id=');
    expect(result).not.toContain('<Block id=');
    expect(result).toContain('<a href={');
    expect(result).toContain('<StorybookBlockExplorer block={');
    expect(result).not.toContain('BlockLinks');
    expect(result).toContain("import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';");
    expect(result).toContain("import { Story } from '@storybook/addon-docs/blocks';");
    expect(addWatchFile).toHaveBeenCalledWith(componentReadme);
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('README.mdx'));
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('index.tsx'));
  });

  it('does not duplicate a Story import the README already provides', async function preservesExistingStoryImport() {
    const result = await runTransform(
      generateBlocksPlugin(),
      'import { Meta, Story } from \'@storybook/addon-docs/blocks\';\n\n<Block id="fixture-block" of={Stories.Preview} />',
      importedReadme
    );

    expect(result?.match(/import \{[^}]*\bStory\b[^}]*\}\s*from\s*'@storybook\/addon-docs\/blocks'/g)).toHaveLength(1);
    expect(result).toContain("import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';");
  });

  it('reports an import alias that occupies the generated Story binding', async function reportsConflictingStoryAlias() {
    await expect(
      runTransform(
        generateBlocksPlugin(),
        'import { Source as Story } from \'@storybook/addon-docs/blocks\';\n\n<Block id="fixture-block" of={Stories.Preview} />',
        importedReadme
      )
    ).rejects.toThrow('Generated "Story" import conflicts with an existing binding.');
  });

  it.each([
    "import { BlockLink } from '@bento/block-explorer/runtime';",
    "import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';",
    "import { Meta, Story } from '@storybook/addon-docs/blocks';",
    [
      "import { Block, BlockLink } from '@bento/block-explorer/runtime';",
      "import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';",
      "import { Meta, Story } from '@storybook/addon-docs/blocks';"
    ].join('\n'),
    [
      "import { BlockLink as RelatedBlock } from '@bento/block-explorer/runtime';",
      "import { StorybookBlockExplorer as Explorer } from '@bento/block-explorer/storybook-runtime';",
      "import { Story as PreviewStory } from '@storybook/addon-docs/blocks';"
    ].join('\n')
  ])('compiles expanded MDX with existing runtime imports: %s', async function compilesExistingImports(imports) {
    const result = await runTransform(
      generateBlocksPlugin(),
      [
        imports,
        '',
        '<BlockLink id="fixture-block" />',
        '',
        '<Block id="fixture-block" of={Stories.Preview} />',
        '',
        '<BlockLink id="fixture-block" />'
      ].join('\n'),
      importedReadme
    );

    expect(result).toContain('<a href={');
    expect(result).toContain('<StorybookBlockExplorer block=');
    await expect(compile(result)).resolves.toBeDefined();
  });

  it.each(['\n', '\r\n'])('preserves YAML containing JSX with %j line endings', async function preservesYaml(newline) {
    const frontmatter = ['---', 'title: >-', '  <Block id="not-a-live-block" />', '---', ''].join(newline);
    const result = await runTransform(
      generateBlocksPlugin(),
      `${frontmatter}<Block id="fixture-block" of={Stories.Preview} />`,
      componentReadme
    );

    expect(result?.startsWith(frontmatter)).toBe(true);
    expect(result).toContain('<Block id="not-a-live-block" />');
    await expect(compile(result, { remarkPlugins: [remarkFrontmatter] })).resolves.toBeDefined();
  });

  it('leaves fenced examples and MDX comments as documentation', async function ignoresDocumentedMarkers() {
    const source = [
      '```mdx',
      '<Block id="fixture-block" of={Stories.Preview} />',
      '<BlockLink id="fixture-block" />',
      '```',
      '',
      '{/* <Block id="fixture-block" of={Stories.Preview} /> */}',
      '',
      'Use `<Block id="fixture-block" of={Stories.Preview} />` in docs.'
    ].join('\n');

    await expect(runTransform(generateBlocksPlugin(), source, componentReadme)).resolves.toBeNull();
  });

  it('expands live markers without rewriting documented examples', async function expandsOnlyLiveMarkers() {
    const source = [
      '```mdx',
      '<Block id="missing-block" of={Stories.Preview} />',
      '```',
      '',
      '<Block id="fixture-block" of={Stories.Preview} />'
    ].join('\n');
    const result = await runTransform(generateBlocksPlugin(), source, componentReadme);

    expect(result).toContain('<Block id="missing-block" of={Stories.Preview} />');
    expect(result).toContain('<StorybookBlockExplorer block={');
    expect(result).not.toContain('<Block id="fixture-block"');
  });

  it('reports missing marker attributes with the README path', async function reportsInvalidMarkers() {
    await expect(
      runTransform(generateBlocksPlugin(), '<Block id="invalid-block" />', invalidBlockReadme)
    ).rejects.toThrow(`${invalidBlockReadme}: <Block> requires id="..." and of={Stories.Preview}.`);
    await expect(runTransform(generateBlocksPlugin(), '<BlockLink />', invalidLinkReadme)).rejects.toThrow(
      `${invalidLinkReadme}: <BlockLink> requires id="...".`
    );
  });

  it('invalidates only READMEs whose embedded block source changed', async function invalidatesOnSourceEvents() {
    const { server, invalidated } = createFakeServer([componentReadme, importedReadme]);
    const plugin = generateBlocksPlugin();
    (plugin.configureServer as Function)(server);

    await runTransform(plugin, '<Block id="fixture-block" of={Stories.Preview} />', componentReadme);
    await runTransform(plugin, '<BlockLink id="fixture-block" />', importedReadme);
    expect(server.watcher.add).toHaveBeenCalledWith(packageBlockDirectory);
    expect(server.watcher.add).toHaveBeenCalledTimes(1);

    const sourceEvents = [
      ['add', `${packageBlockDirectory}/new/nested/added.ts`],
      ['change', `${packageBlockDirectory}/index.tsx`],
      ['unlink', `${packageBlockDirectory}/new/nested/added.ts`]
    ];
    for (const [event, path] of sourceEvents) {
      server.watcher.emit('all', event, path);
      expect(invalidated(), `${event} ${path}`).toEqual([`client:${componentReadme}`, `ssr:${componentReadme}`]);
      expect(server.ws.send).toHaveBeenCalledExactlyOnceWith({ type: 'full-reload' });
      server.ws.send.mockClear();
    }

    server.watcher.emit('all', 'change', `${packageBlockDirectory}/README.mdx`);
    expect(invalidated()).toEqual([
      `client:${componentReadme}`,
      `ssr:${componentReadme}`,
      `client:${importedReadme}`,
      `ssr:${importedReadme}`
    ]);
    expect(server.ws.send).toHaveBeenCalledExactlyOnceWith({ type: 'full-reload' });
    server.ws.send.mockClear();

    const ignoredEvents = [
      ['addDir', `${packageBlockDirectory}/new`],
      ['change', `${packageBlockDirectory}/test/fixture.test.ts`],
      ['change', `${packageBlockDirectory}/fixture.stories.tsx`],
      ['change', resolve(packageBlockDirectory, '../sibling-block/index.tsx')]
    ];
    for (const [event, path] of ignoredEvents) {
      server.watcher.emit('all', event, path);
      expect(invalidated(), `${event} ${path}`).toEqual([]);
    }
    expect(server.ws.send).not.toHaveBeenCalled();

    await runTransform(plugin, '# No explorer', componentReadme);
    server.watcher.emit('all', 'change', `${packageBlockDirectory}/index.tsx`);
    expect(invalidated()).toEqual([]);
    expect(server.ws.send).not.toHaveBeenCalled();
  });

  it('registers the block plugin before existing Storybook plugins', async function prependsPlugin() {
    const existingPlugin = { name: 'existing-plugin' };
    const config = { plugins: [existingPlugin] };

    await (viteFinal as NonNullable<typeof viteFinal>)(config as never, {} as never);

    expect(config.plugins[0]).toMatchObject({ name: 'block-explorer-mdx' });
    expect(config.plugins[1]).toBe(existingPlugin);
  });
});

/** Invokes the Vite transform with an observable dependency-registration context. */
async function runTransform(
  plugin: ReturnType<typeof generateBlocksPlugin>,
  source: string,
  id: string,
  addWatchFile = vi.fn()
) {
  return (plugin.transform as Function).call({ addWatchFile }, source, id);
}

/** Builds the dev-server surface the plugin uses, recording invalidations as `environment:file`. */
function createFakeServer(readmes: readonly string[]) {
  const invalidations: string[] = [];
  const environment = (name: string) => ({
    moduleGraph: {
      getModulesByFile: (file: string) => (readmes.includes(file) ? new Set([{ file }]) : undefined),
      invalidateModule: (module: { file: string }) => invalidations.push(`${name}:${module.file}`)
    }
  });
  const watcher = Object.assign(new EventEmitter(), { add: vi.fn() });
  const server = {
    watcher,
    ws: { send: vi.fn() },
    environments: { client: environment('client'), ssr: environment('ssr') }
  };

  return {
    server,
    invalidated: () => invalidations.splice(0)
  };
}
