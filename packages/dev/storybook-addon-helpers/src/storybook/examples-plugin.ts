import type { Plugin } from 'vite';
import { readFile } from 'node:fs/promises';
import { discoverExamplesForReadme, type ExampleDescriptor } from '../examples.ts';

/** Matches the `<Examples of={Stories.<name>} />` marker authored in a component README. */
const EXAMPLES_MARKER = /<Examples\b[^>]*\/>/;
/** Extracts the export name from an `of={Stories.<name>}` attribute on the marker. */
const OF_ATTR = /\bof=\{\s*[\w$]+\.([\w$]+)\s*\}/;

/**
 * Vite plugin that expands the `<Examples of={Stories.<name>} />` marker in a
 * component README into one documented block per example (heading, JSDoc
 * description, `<Story>` preview, and raw `<Source>`). The examples are resolved
 * by following the `of` reference to the colocated stories file and its
 * `getExamples(<dir>)` folder, via the shared {@link discoverExamplesForReadme}
 * core.
 *
 * Storybook's `addon-docs` MDX pipeline does not expose the README's file path to
 * remark plugins, and it compiles the MDX to JS during Vite's `load` phase. The
 * expansion is therefore done here in a `load` hook (registered ahead of the MDX
 * loader) that reads the raw README, expands the marker, and hands the result
 * back for normal MDX compilation. The generated blocks reference the CSF stories
 * produced from the same examples (`Stories.<Name>`), so Storybook's sidebar and
 * docs stay in sync.
 *
 * @param readmeRegex - Matches the README files to expand.
 */
export function generateExamplesPlugin(readmeRegex: RegExp): Plugin {
  return {
    name: 'bento-storybook-addon-helpers-examples',
    enforce: 'pre',
    async load(id) {
      if (!readmeRegex.test(id)) return null;

      const code = await readFile(id, 'utf8');
      const marker = code.match(EXAMPLES_MARKER);
      if (!marker) return null;

      this.addWatchFile(id);

      const exportName = marker[0].match(OF_ATTR)?.[1];
      const { descriptors, storiesPath } = await discoverExamplesForReadme({ readmePath: id, exportName });
      if (storiesPath) this.addWatchFile(storiesPath);

      const blocks = descriptors.map((descriptor) => {
        this.addWatchFile(descriptor.filePath);
        return renderBlock(descriptor);
      });

      return code.replace(EXAMPLES_MARKER, blocks.join('\n\n'));
    }
  };
}

/** Renders one example as MDX: heading, description, `<Story>`, and inlined `<Source>`. */
function renderBlock(descriptor: ExampleDescriptor): string {
  const parts = [`### ${descriptor.title}`];
  if (descriptor.description) parts.push(descriptor.description);
  parts.push(`<Story of={Stories.${descriptor.storyName}} inline />`);
  parts.push(`<Source code={${JSON.stringify(descriptor.source)}} language="tsx" />`);
  return parts.join('\n\n');
}
