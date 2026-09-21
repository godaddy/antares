import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { generateBlocksPlugin, viteFinal } from '../src/storybook.tsx';

const fixtureReadme = resolve(import.meta.dirname, 'fixtures/block/README.mdx');
const noMarkerReadme = resolve(import.meta.dirname, 'fixtures/no-marker/README.mdx');
const componentReadme = resolve(import.meta.dirname, 'fixtures/package/components/example/README.mdx');
const importedReadme = resolve(import.meta.dirname, 'fixtures/package/components/imported/README.mdx');
const invalidBlockReadme = resolve(import.meta.dirname, 'fixtures/invalid-block/README.mdx');
const invalidLinkReadme = resolve(import.meta.dirname, 'fixtures/invalid-link/README.mdx');

describe('Storybook block explorer plugin', function storybookPluginTests() {
  it('skips non-README files and MDX without a block marker', async function skipsUnrelatedFiles() {
    const plugin = generateBlocksPlugin();

    await expect(runTransform(plugin, '# Guide', '/tmp/guide.mdx')).resolves.toBeNull();
    await expect(runTransform(plugin, '# Fixture without a block marker', noMarkerReadme)).resolves.toBeNull();
  });

  it('expands BlockLink with the Storybook overview route and watch files', async function expandsBlockLink() {
    const plugin = generateBlocksPlugin();
    const addWatchFile = vi.fn();
    const result = await runTransform(plugin, '<BlockLink id="fixture-block" />', fixtureReadme, addWatchFile);

    expect(result).toContain('<BlockLinks blocks={');
    expect(result).toContain('./?path=/docs/blocks-fixture-block--overview');
    expect(result).toContain('blocks-fixture-block--overview');
    expect(result).toContain('target":"_top"');
    expect(result).toContain("import { BlockLinks } from '@bento/block-explorer/runtime';");
    expect(addWatchFile).toHaveBeenCalledWith(fixtureReadme);
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('README.mdx'));
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('styles/theme.css'));
  });

  it('expands Block after frontmatter and injects missing Storybook imports', async function expandsBlock() {
    const result = await runTransform(
      generateBlocksPlugin(),
      '---\ntitle: Example component\n---\n<Block id="fixture-block" description="Fixture description." of={Stories.Preview} />',
      componentReadme
    );

    expect(result).toContain('---\ntitle: Example component\n---\nimport { StorybookBlockExplorer }');
    expect(result).toContain('<StorybookBlockExplorer block={');
    expect(result).toContain('<Story of={Stories.Preview} inline />');
    expect(result).toContain("import { Story } from '@storybook/addon-docs/blocks';");
  });

  it('expands Block without a description', async function expandsBlockWithoutDescription() {
    const result = await runTransform(
      generateBlocksPlugin(),
      '<Block id="fixture-block" of={Stories.Preview} />',
      componentReadme
    );

    expect(result).toContain('<StorybookBlockExplorer block=');
    expect(result).toContain('<Story of={Stories.Preview} inline />');
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
    expect(result).toContain('<BlockLinks blocks={');
    expect(result).toContain('<StorybookBlockExplorer block={');
    expect(result).toContain("import { BlockLinks } from '@bento/block-explorer/runtime';");
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
      runTransform(generateBlocksPlugin(), '<Block id="fixture-block" />', invalidBlockReadme)
    ).rejects.toThrow(`${invalidBlockReadme}: <Block> requires id="..." and of={Stories.Preview}.`);
    await expect(runTransform(generateBlocksPlugin(), '<BlockLink />', invalidLinkReadme)).rejects.toThrow(
      `${invalidLinkReadme}: <BlockLink> requires id="...".`
    );
  });

  it('registers the block plugin before existing Storybook plugins', async function prependsPlugin() {
    const existingPlugin = { name: 'existing-plugin' };
    const config = { plugins: [existingPlugin] };

    await (viteFinal as NonNullable<typeof viteFinal>)(config as never, {} as never);

    expect(config.plugins[0]).toMatchObject({ name: 'block-explorer-mdx' });
    expect(config.plugins[1]).toBe(existingPlugin);
  });
});

async function runTransform(
  plugin: ReturnType<typeof generateBlocksPlugin>,
  source: string,
  id: string,
  addWatchFile = vi.fn()
) {
  return (plugin.transform as Function).call({ addWatchFile }, source, id);
}
