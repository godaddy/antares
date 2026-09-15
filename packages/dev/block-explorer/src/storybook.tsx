import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';
import { loadBlockManifest, resolveBlockDirectory } from './node.ts';

const README_FILE_REGEX = /README\.mdx$/;
const BLOCK_MARKER_REGEX = /<(Block|BlockLink)\b[\s\S]*?\/>/;

/** Adds block MDX expansion before Storybook's MDX loader runs. */
export const viteFinal: StorybookConfig['viteFinal'] = async function viteFinal(config, _options) {
  config.plugins ??= [];
  config.plugins.unshift(generateBlocksPlugin());
  return config;
};

/**
 * Creates the Vite transform that expands block markers in Storybook MDX.
 *
 * @param readmeRegex - File-name matcher used to limit the transform to documentation files.
 */
export function generateBlocksPlugin(readmeRegex: RegExp = README_FILE_REGEX): Plugin {
  return {
    name: 'block-explorer-mdx',
    enforce: 'pre',
    async transform(source, id) {
      const fileName = id.split('?')[0];
      if (!readmeRegex.test(fileName)) return null;

      const marker = source.match(BLOCK_MARKER_REGEX)?.[0];
      if (!marker) return null;

      const markerName = marker.match(/^<(Block|BlockLink)\b/)?.[1];
      const idValue = marker.match(/\bid=["']([^"']+)["']/)?.[1];
      if (!idValue) {
        throw new Error(`${fileName}: <${markerName ?? 'Block'}> requires id="...".`);
      }

      const blockDirectory = await resolveBlockDirectory(fileName, idValue);
      const manifest = await loadBlockManifest(blockDirectory);
      this.addWatchFile(fileName);
      this.addWatchFile(`${blockDirectory}/block.json`);
      for (const blockFile of manifest.files) this.addWatchFile(`${blockDirectory}/${blockFile.path}`);

      if (markerName === 'BlockLink') {
        const blockLink = {
          id: manifest.id,
          title: manifest.title,
          href: `./?path=/docs/blocks-${manifest.id}--overview`,
          target: '_top'
        };
        const expanded = source.replace(marker, `<BlockLinks blocks={${JSON.stringify([blockLink])}} />`);
        return ensureImports(expanded, ['BlockLinks']);
      }

      const ofExpression = marker.match(/\bof=\{\s*([^}]+?)\s*\}/)?.[1]?.trim();
      if (!ofExpression) {
        throw new Error(`${fileName}: <Block> requires id="..." and of={Stories.Preview}.`);
      }

      const expandedBlock = `<StorybookBlockExplorer block={${JSON.stringify(manifest)}}><Story of={${ofExpression}} inline /></StorybookBlockExplorer>`;
      const expanded = source.replace(marker, expandedBlock);
      return ensureImports(expanded, ['StorybookBlockExplorer', 'Story']);
    }
  };
}

function ensureImports(source: string, names: readonly string[]): string {
  const imports: string[] = [];
  if (names.includes('BlockLinks') && !/import\s*\{[^}]*\bBlockLinks\b[^}]*\}/s.test(source)) {
    imports.push("import { BlockLinks } from '@bento/block-explorer/runtime';");
  }
  if (names.includes('StorybookBlockExplorer') && !/import\s*\{[^}]*\bStorybookBlockExplorer\b[^}]*\}/s.test(source)) {
    imports.push("import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';");
  }
  if (
    names.includes('Story') &&
    !/import\s*\{[^}]*\bStory\b[^}]*\}\s*from\s*['"]@storybook\/addon-docs\/blocks['"]/s.test(source)
  ) {
    imports.push("import { Story } from '@storybook/addon-docs/blocks';");
  }

  if (imports.length === 0) return source;
  const frontmatter = source.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  return `${source.slice(0, frontmatter.length)}${imports.join('\n')}\n${source.slice(frontmatter.length)}`;
}
