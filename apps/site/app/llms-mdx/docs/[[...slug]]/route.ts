import { getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms-mdx/docs/[[...slug]]'>) {
  const slug = (await params).slug;

  // Static export (GitHub Pages) only generates a placeholder slug; the rewrite
  // that maps /docs/:path*.mdx to this route is disabled in static export mode
  // anyway, so this content is not reachable there.
  if (!slug || slug[0] === '_placeholder') {
    return new Response('', {
      headers: { 'Content-Type': 'text/markdown' }
    });
  }

  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
      Vary: 'Accept'
    }
  });
}

export function generateStaticParams() {
  // Static export (GitHub Pages) can't handle nested component paths: trailingSlash:true
  // creates file/directory conflicts (ENOTDIR) for paths like components/layout/box.
  // A single flat placeholder slug satisfies output:export without generating conflicts.
  if (process.env.GITHUB_PAGES === 'true') return [{ slug: ['_placeholder'] }];
  return source.generateParams();
}
