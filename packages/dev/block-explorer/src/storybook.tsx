import type { Root } from 'mdast';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';
import {
  collectBlockMarkers,
  getYamlFrontmatter,
  hasNamedRuntimeImport,
  parseBlockMdx,
  type BlockMarker
} from './mdx-block-markers.ts';
import { loadBlockManifest, resolveBlockDirectory } from './node.ts';

const README_FILE_REGEX = /README\.mdx$/;
const STORYBOOK_DOCS_MODULE = '@storybook/addon-docs/blocks';
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

/**
 * Adds block MDX expansion before Storybook's MDX loader runs.
 *
 * @param config - Storybook's Vite configuration, updated in place.
 * @param _options - Storybook preset context; unused by this adapter.
 * @returns The configuration with the block pre-transform registered first.
 */
export const viteFinal: StorybookConfig['viteFinal'] = async function viteFinal(config, _options) {
  config.plugins ??= [];
  config.plugins.unshift(generateBlocksPlugin());
  return config;
};

/**
 * Creates a pre-transform for block markers in matching README files.
 *
 * @param readmeRegex - File-path filter; defaults to paths ending in `README.mdx`.
 * @returns A Vite plugin that expands markers and watches their source dependencies.
 */
export function generateBlocksPlugin(readmeRegex: RegExp = README_FILE_REGEX): Plugin {
  return {
    name: 'block-explorer-mdx',
    enforce: 'pre',
    /** Expands authored markers before MDX compilation and registers their dependencies. */
    async transform(source, id) {
      const fileName = id.split('?')[0];
      if (!readmeRegex.test(fileName)) return null;

      const tree = parseBlockMdx(source, fileName);
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
 * Expands live markers, caching manifests only for the duration of this transform.
 *
 * @param fileName - Source README used to resolve blocks and report errors.
 * @param markers - Live markers in source order.
 * @returns Replacements with their required runtime imports and watched files.
 * @throws If a marker is incomplete or its block cannot be loaded.
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
      const href = `./?path=/docs/blocks-${manifest.id}--overview`;
      expansions.push({
        start: marker.start,
        end: marker.end,
        value: `<a href={${JSON.stringify(href)}} target="_top">{${JSON.stringify(manifest.id)}}</a>`,
        imports: [],
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
 * Applies replacements from right to left to preserve original source offsets.
 *
 * @param source - Original MDX source.
 * @param expansions - Replacements ordered by their original source positions.
 * @returns MDX source with all markers replaced.
 */
function applyReplacements(source: string, expansions: readonly Expansion[]): string {
  let expanded = source;
  for (const replacement of [...expansions].reverse()) {
    expanded = `${expanded.slice(0, replacement.start)}${replacement.value}${expanded.slice(replacement.end)}`;
  }
  return expanded;
}

/**
 * Inserts missing runtime imports after frontmatter without rewriting authored content.
 *
 * @param source - MDX source after marker expansion.
 * @param lines - Import statements required by the generated replacements.
 * @param tree - Original MDX tree used to locate frontmatter and existing imports.
 * @returns Source containing each required import, separated from MDX content by a blank line.
 */
function prependImports(source: string, lines: readonly string[], tree: Root): string {
  const requiredImports = [
    [STORY_IMPORT, 'Story', STORYBOOK_DOCS_MODULE],
    [BLOCK_EXPLORER_IMPORT, 'StorybookBlockExplorer', '@bento/block-explorer/storybook-runtime']
  ] as const;
  const imports = [...new Set(lines)].filter(function isMissingImport(line) {
    const required = requiredImports.find(([statement]) => statement === line);
    return !required || !hasNamedRuntimeImport(tree, required[1], required[2]);
  });
  if (imports.length === 0) return source;
  const frontmatter = getYamlFrontmatter(tree);
  let offset = frontmatter?.position?.end.offset ?? 0;
  if (frontmatter) {
    if (source[offset] === '\r') offset += 1;
    if (source[offset] === '\n') offset += 1;
  }
  return `${source.slice(0, offset)}${imports.join('\n')}\n\n${source.slice(offset)}`;
}
