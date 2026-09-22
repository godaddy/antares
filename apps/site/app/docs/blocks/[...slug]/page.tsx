import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/mdx-components';
import { blocksSource } from '@/lib/source';

/**
 * Renders the requested block README, returning a 404 when the block is absent.
 *
 * @param props - {@link PageProps} for the block documentation route.
 */
export default async function BlockPage(props: PageProps<'/docs/blocks/[...slug]'>) {
  const page = blocksSource.getPage((await props.params).slug);
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

/**
 * Enumerates block pages for the static documentation export.
 *
 * @returns Route parameters for the discovered block pages.
 */
export function generateStaticParams() {
  return blocksSource.generateParams();
}

/**
 * Uses the block README's title and description as page metadata.
 *
 * @param props - {@link PageProps} for the block documentation route.
 * @returns Page metadata, or triggers a 404 when the block is absent.
 */
export async function generateMetadata(props: PageProps<'/docs/blocks/[...slug]'>) {
  const page = blocksSource.getPage((await props.params).slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description
  };
}
