import { source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const pages = source.getPages().map((page) => `- [${page.data.title}](${page.url}): ${page.data.description}`);
  return new Response(['# Documentation', '', ...pages].join('\n'));
}
