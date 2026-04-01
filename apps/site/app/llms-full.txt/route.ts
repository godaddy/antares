import { getLLMText, source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  return new Response((await Promise.all(source.getPages().map(getLLMText))).join('\n\n'));
}
