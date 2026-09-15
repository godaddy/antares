import { blocks, docs, components } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader, multiple } from 'fumadocs-core/source';
import type * as PageTree from 'fumadocs-core/page-tree';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

/**
 * Prefix component paths with `components/` and map `…/README.mdx` → `…/<folder>.mdx`
 * so fumadocs serves them at /docs/components/* URLs.
 */
function toComponentsSource() {
  const raw = components.toFumadocsSource();
  return {
    ...raw,
    files: raw.files.map((file) => ({
      ...file,
      path: `components/${file.path.replace(/\/README\.mdx$/, '.mdx')}`
    })) as ReturnType<typeof components.toFumadocsSource>['files']
  };
}

function toBlocksSource() {
  const raw = blocks.toFumadocsSource();
  return {
    ...raw,
    files: raw.files.map((file) => ({
      ...file,
      path: file.path.replace(/\/README\.mdx$/, '.mdx')
    })) as ReturnType<typeof blocks.toFumadocsSource>['files']
  };
}

export const source = loader(
  multiple({
    root: docs.toFumadocsSource(),
    components: toComponentsSource()
  }),
  {
    baseUrl: '/docs',
    plugins: [lucideIconsPlugin()]
  }
);

export const blocksSource = loader(toBlocksSource(), {
  baseUrl: '/docs/blocks',
  plugins: [lucideIconsPlugin()]
});

/**
 * Adds the Blocks page immediately after the existing documentation home page
 * without changing the generated Site navigation hierarchy.
 */
export function getDocsPageTree(): PageTree.Root {
  const tree = source.getPageTree();
  const blocksPage: PageTree.Item = {
    $id: 'antares-blocks-index',
    type: 'page',
    name: 'Blocks',
    url: '/docs/blocks'
  };

  const welcomeIndex = tree.children.findIndex((node) => node.type === 'page' && node.url === '/docs');
  const insertionIndex = welcomeIndex >= 0 ? welcomeIndex + 1 : 0;

  return {
    ...tree,
    children: [...tree.children.slice(0, insertionIndex), blocksPage, ...tree.children.slice(insertionIndex)]
  };
}

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
