/**
 * Returns style-dictionary's fileHeader from 'style-dictionary/utils'.
 * Uses dynamic import so the static import is not subject to noUnresolvedImports.
 */
export async function getFileHeader(): Promise<
  (options: { file: import('style-dictionary/types').File; commentStyle: 'long' | 'short' | 'xml' }) => Promise<string>
> {
  const { fileHeader } = await import('style-dictionary/utils');
  return fileHeader;
}
