import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { generateBlocksPlugin, viteFinal } from '../src/storybook.tsx';

const fixtureReadme = resolve(import.meta.dirname, 'fixtures/block/README.mdx');

describe('Storybook block explorer plugin', function storybookPluginTests() {
  it('skips non-README files and MDX without a block marker', async function skipsUnrelatedFiles() {
    const plugin = generateBlocksPlugin();

    await expect(runTransform(plugin, '<BlockLink id="fixture-block" />', '/tmp/guide.mdx')).resolves.toBeNull();
    await expect(runTransform(plugin, '# Fixture block', fixtureReadme)).resolves.toBeNull();
  });

  it('expands BlockLink with the Storybook overview route and watch files', async function expandsBlockLink() {
    const plugin = generateBlocksPlugin();
    const addWatchFile = vi.fn();
    const result = await runTransform(plugin, '<BlockLink id="fixture-block" />', fixtureReadme, addWatchFile);

    expect(result).toContain('<BlockLinks blocks={');
    expect(result).toContain('blocks-fixture-block--overview');
    expect(result).toContain('target":"_top"');
    expect(result).toContain("import { BlockLinks } from '@bento/block-explorer/runtime';");
    expect(addWatchFile).toHaveBeenCalledWith(fixtureReadme);
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('block.json'));
    expect(addWatchFile).toHaveBeenCalledWith(expect.stringContaining('styles/theme.css'));
  });

  it('expands Block after frontmatter and injects missing Storybook imports', async function expandsBlock() {
    const source = '---\ntitle: Fixture block\n---\n<Block id="fixture-block" of={Stories.Preview} />';
    const result = await runTransform(generateBlocksPlugin(), source, fixtureReadme);

    expect(result).toContain('---\ntitle: Fixture block\n---\nimport { StorybookBlockExplorer }');
    expect(result).toContain('<StorybookBlockExplorer block={');
    expect(result).toContain('<Story of={Stories.Preview} inline />');
    expect(result).toContain("import { Story } from '@storybook/addon-docs/blocks';");
  });

  it('does not duplicate imports that the README already provides', async function preservesExistingImports() {
    const source = [
      "import { BlockLinks } from '@bento/block-explorer/runtime';",
      '<BlockLink id="fixture-block" />'
    ].join('\n');
    const result = await runTransform(generateBlocksPlugin(), source, fixtureReadme);

    expect(result?.match(/import \{ BlockLinks \}/g)).toHaveLength(1);
  });

  it('reports missing marker attributes with the README path', async function reportsInvalidMarkers() {
    await expect(runTransform(generateBlocksPlugin(), '<Block id="fixture-block" />', fixtureReadme)).rejects.toThrow(
      `${fixtureReadme}: <Block> requires id="..." and of={Stories.Preview}.`
    );
    await expect(runTransform(generateBlocksPlugin(), '<BlockLink />', fixtureReadme)).rejects.toThrow(
      `${fixtureReadme}: <BlockLink> requires id="...".`
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
