import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

const search = createFromSource(source, { language: 'english' });
export const GET = process.env.GITHUB_PAGES === 'true' ? search.staticGET : search.GET;
