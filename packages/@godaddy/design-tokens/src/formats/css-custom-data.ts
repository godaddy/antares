import type { FormatFnArguments, TransformedToken } from 'style-dictionary/types';

/**
 * Style Dictionary format: VS Code CSS Custom Data (v1.1) for autocomplete of
 * design token custom properties in .css files. Consumers add this file to
 * css.customData in VS Code settings for var(--...) completions.
 */
export function formatVscodeCssCustomData({ dictionary }: Pick<FormatFnArguments, 'dictionary'>): string {
  const properties = dictionary.allTokens.map(toCustomDataEntry);
  const payload = { version: 1.1, properties };
  return JSON.stringify(payload, null, 2);
}

function toCustomDataEntry(token: TransformedToken): { name: string; description?: string } {
  const entry: { name: string; description?: string } = { name: `--${token.name}` };
  const desc = token.$description ?? token.original?.$description;
  if (desc != null && String(desc).trim() !== '') {
    entry.description = String(desc).trim();
  }
  return entry;
}
