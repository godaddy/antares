import { remarkStripLeadingHeading } from './lib/remark-strip-leading-heading';
import { applyMdxPreset, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { remarkRawLoader } from './lib/remark-raw-loader.ts';
import { remarkArgTypes } from './lib/remark-arg-types.ts';

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
        remarkPlugins: (v) => [remarkStripLeadingHeading, remarkArgTypes, remarkRawLoader, ...v]
      })(env)
  },
  meta: {
    schema: metaSchema
  }
});

export default defineConfig({});
