import { Card, Cards } from 'fumadocs-ui/components/card';
import { source } from '@/lib/source';

/** Card grid that auto-discovers all `/docs/components/` pages. */
export function ComponentCards() {
  const pages = source
    .getPages()
    .filter((page) => page.url.startsWith('/docs/components/'))
    .sort((a, b) => a.url.localeCompare(b.url));

  return (
    <Cards>
      {pages.map((page) => (
        <Card key={page.url} title={page.data.title} href={page.url}>
          {page.data.description}
        </Card>
      ))}
    </Cards>
  );
}
