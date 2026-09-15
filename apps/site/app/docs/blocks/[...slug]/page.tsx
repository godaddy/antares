import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/mdx-components';
import { blocksSource } from '@/lib/source';

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

export function generateStaticParams() {
  return blocksSource.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/blocks/[...slug]'>) {
  const page = blocksSource.getPage((await props.params).slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description
  };
}
