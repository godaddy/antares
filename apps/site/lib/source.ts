import { docs, components } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader, multiple } from 'fumadocs-core/source';
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
