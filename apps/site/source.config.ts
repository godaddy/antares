import { remarkStripLeadingHeading } from './lib/remark-strip-leading-heading';
import { applyMdxPreset, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { remarkRawLoader } from './lib/remark-raw-loader.ts';
import { docsDefaults } from '../../configs/docs-defaults.mts';
import { remarkArgTypes } from './lib/remark-arg-types.ts';
import { remarkExamples } from '@bento/storybook-addon-helpers/docs';
import { remarkBlocks } from '@bento/block-explorer/node';
import { addMdxDependency } from './lib/remark-mdx-utils.ts';
import { remarkGfm } from 'fumadocs-core/mdx-plugins/remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
/**
 * Keeps related-block links within the deployed site's base path.
 *
 * @param id - Block directory identifier.
 * @returns The block overview URL, including the deployment base path.
 */
const resolveBlockHref = (id: string) => `${basePath}/docs/blocks/${id}`;

const descriptionParser = unified().use(remarkParse).use(remarkGfm);
const parseMarkdown = (markdown: string) => descriptionParser.parse(markdown).children;

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    },
    mdxOptions: (env) =>
      applyMdxPreset({
        remarkPlugins: (v) => [remarkStripLeadingHeading, ...v]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export const components = defineDocs({
  dir: '../../packages/@godaddy/antares/components',
  docs: {
    files: ['**/README.mdx', '!**/_internal/**'],
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    },
    // Wrap with applyMdxPreset so remarkStructure (search indexing) still runs.
    mdxOptions: (env) =>
      applyMdxPreset({
        remarkPlugins: (v) => [
          remarkStripLeadingHeading,
          [remarkArgTypes, { docsDefaults }],
          [remarkExamples, { target: 'components', onDependency: addMdxDependency, parseMarkdown }],
          remarkRawLoader,
          [remarkBlocks, { resolveBlockHref }],
          ...v
        ]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export const blocks = defineDocs({
  dir: '../../packages/@godaddy/antares/blocks',
  docs: {
    files: ['**/README.mdx'],
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    },
    mdxOptions: (env) =>
      applyMdxPreset({
        remarkPlugins: (v) => [remarkStripLeadingHeading, [remarkBlocks, { resolveBlockHref }], ...v]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export default defineConfig({});
