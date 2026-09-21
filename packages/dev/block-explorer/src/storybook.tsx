import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';
import { collectBlockMarkers } from './mdx-block-markers.ts';
import { loadBlockManifest, resolveBlockDirectory } from './node.ts';

const README_FILE_REGEX = /README\.mdx$/;

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

      const markers = collectBlockMarkers(source);
      if (markers.length === 0) return null;

      let expanded = source;
      const requiredImports = new Set<string>();
      const watchFiles = new Set<string>([fileName]);
      const replacements: { start: number; end: number; value: string }[] = [];

      for (const marker of markers) {
        if (!marker.id) {
          throw new Error(`${fileName}: <${marker.name}> requires id="...".`);
        }

        const blockDirectory = await resolveBlockDirectory(fileName, marker.id);
        const manifest = await loadBlockManifest(blockDirectory, { id: marker.id, description: marker.description });

        watchFiles.add(`${blockDirectory}/README.mdx`);
        for (const blockFile of manifest.files) watchFiles.add(`${blockDirectory}/${blockFile.path}`);

        if (marker.name === 'BlockLink') {
          const blockLink = {
            id: manifest.id,
            href: `./?path=/docs/blocks-${manifest.id}--overview`,
            target: '_top'
          };
          replacements.push({
            start: marker.start,
            end: marker.end,
            value: `<BlockLinks blocks={${JSON.stringify([blockLink])}} />`
          });
          requiredImports.add('BlockLinks');
          continue;
        }

        if (!marker.ofExpression) {
          throw new Error(`${fileName}: <Block> requires id="..." and of={Stories.Preview}.`);
        }

        replacements.push({
          start: marker.start,
          end: marker.end,
          value: `<StorybookBlockExplorer block={${JSON.stringify(manifest)}}><Story of={${marker.ofExpression}} inline /></StorybookBlockExplorer>`
        });
        requiredImports.add('StorybookBlockExplorer');
        requiredImports.add('Story');
      }

      for (const replacement of replacements.toReversed()) {
        expanded = `${expanded.slice(0, replacement.start)}${replacement.value}${expanded.slice(replacement.end)}`;
      }

      for (const watchFile of watchFiles) this.addWatchFile(watchFile);
      return ensureImports(expanded, [...requiredImports]);
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
