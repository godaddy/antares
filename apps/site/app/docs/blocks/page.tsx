import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { blocksSource } from '@/lib/source';

export const metadata = {
  title: 'Build product experiences with Antares.',
  description:
    'Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.'
};

/** Renders the shared blocks README for the Site documentation. */
export default function DocsBlocksPage() {
  const page = blocksSource.getPage([]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} footer={{ enabled: true }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(blocksSource, page) })} />
      </DocsBody>
    </DocsPage>
  );
}
