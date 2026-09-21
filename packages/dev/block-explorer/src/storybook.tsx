import type { Root } from 'mdast';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';
import { collectBlockMarkers, hasNamedRuntimeImport, parseBlockMdx, type BlockMarker } from './mdx-block-markers.ts';
import { loadBlockManifest, resolveBlockDirectory } from './node.ts';

const README_FILE_REGEX = /README\.mdx$/;
const STORYBOOK_DOCS_MODULE = '@storybook/addon-docs/blocks';
const BLOCK_LINK_IMPORT = "import { BlockLinks } from '@bento/block-explorer/runtime';";
const BLOCK_EXPLORER_IMPORT = "import { StorybookBlockExplorer } from '@bento/block-explorer/storybook-runtime';";
const STORY_IMPORT = `import { Story } from '${STORYBOOK_DOCS_MODULE}';`;

interface Expansion {
  /** Inclusive start offset of the marker in the original MDX source. */
  start: number;

  /** Exclusive end offset of the marker in the original MDX source. */
  end: number;

  /** MDX replacement inserted in place of the marker. */
  value: string;

  /** Runtime imports required by the replacement. */
  imports: readonly string[];

  /** Files that can change the generated replacement. */
  watchFiles: readonly string[];
}

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

      const tree = parseBlockMdx(source);
      const markers = collectBlockMarkers(tree);
      if (markers.length === 0) return null;

      const expansions = await expandMarkers(fileName, markers);
      for (const watchFile of new Set([fileName, ...expansions.flatMap((expansion) => expansion.watchFiles)])) {
        this.addWatchFile(watchFile);
      }

      const expanded = applyReplacements(source, expansions);
      return prependImports(
        expanded,
        expansions.flatMap((expansion) => expansion.imports),
        tree
      );
    }
  };
}

/**
 * Resolves each live block marker into its generated MDX and dependencies.
 *
 * Manifests are cached for the duration of this transform so repeated markers
 * for the same block do not rediscover the same files.
 *
 * @param fileName - Absolute path to the README being transformed.
 * @param markers - Live block markers collected from the MDX AST.
 */
async function expandMarkers(fileName: string, markers: readonly BlockMarker[]): Promise<Expansion[]> {
  const manifestCache = new Map<string, Awaited<ReturnType<typeof loadBlockManifest>>>();
  const expansions: Expansion[] = [];

  for (const marker of markers) {
    if (!marker.id) {
      throw new Error(`${fileName}: <${marker.name}> requires id="...".`);
    }

    const blockDirectory = await resolveBlockDirectory(fileName, marker.id);
    const cacheKey = `${blockDirectory}:${marker.id}:${marker.description ?? ''}`;
    let manifest = manifestCache.get(cacheKey);
    if (!manifest) {
      manifest = await loadBlockManifest(blockDirectory, { id: marker.id, description: marker.description });
      manifestCache.set(cacheKey, manifest);
    }

    const watchFiles = [
      `${blockDirectory}/README.mdx`,
      ...manifest.files.map((blockFile) => `${blockDirectory}/${blockFile.path}`)
    ];

    if (marker.name === 'BlockLink') {
      const blockLink = {
        id: manifest.id,
        href: `./?path=/docs/blocks-${manifest.id}--overview`,
        target: '_top'
      };
      expansions.push({
        start: marker.start,
        end: marker.end,
        value: `<BlockLinks blocks={${JSON.stringify([blockLink])}} />`,
        imports: [BLOCK_LINK_IMPORT],
        watchFiles
      });
      continue;
    }

    if (!marker.ofExpression) {
      throw new Error(`${fileName}: <Block> requires id="..." and of={Stories.Preview}.`);
    }

    expansions.push({
      start: marker.start,
      end: marker.end,
      value: `<StorybookBlockExplorer block={${JSON.stringify(manifest)}}><Story of={${marker.ofExpression}} inline /></StorybookBlockExplorer>`,
      imports: [BLOCK_EXPLORER_IMPORT, STORY_IMPORT],
      watchFiles
    });
  }

  return expansions;
}

/**
 * Applies marker replacements from right to left so source offsets remain valid.
 *
 * @param source - Original MDX source.
 * @param expansions - Marker replacements generated from the source.
 */
function applyReplacements(source: string, expansions: readonly Expansion[]): string {
  let expanded = source;
  for (const replacement of [...expansions].reverse()) {
    expanded = `${expanded.slice(0, replacement.start)}${replacement.value}${expanded.slice(replacement.end)}`;
  }
  return expanded;
}

/**
 * Adds required imports after frontmatter while avoiding duplicate Story imports.
 *
 * @param source - Transformed MDX source.
 * @param lines - Import lines required by the generated replacements.
 * @param tree - Original MDX AST used to inspect existing runtime imports.
 */
function prependImports(source: string, lines: readonly string[], tree: Root): string {
  const imports = [...new Set(lines)].filter(
    (line) => line !== STORY_IMPORT || !hasNamedRuntimeImport(tree, 'Story', STORYBOOK_DOCS_MODULE)
  );
  if (imports.length === 0) return source;
  const frontmatter = source.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  return `${source.slice(0, frontmatter.length)}${imports.join('\n')}\n${source.slice(frontmatter.length)}`;
}
