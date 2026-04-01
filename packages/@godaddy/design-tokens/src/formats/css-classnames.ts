import { commentStyles } from 'style-dictionary/enums';
import type { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { cssVarWithFallback, tokenDtcgType, tokenResolvedValueForVarFallback } from './css-var-fallback.ts';
import { getFileHeader } from './file-header.ts';
/*
  import classnames from '@godaddy/design-tokens/classnames.module.css';

  <div className={classnames['font-body-family']}>...</div>
*/

/**
 * Style Dictionary format: CSS utility classes using var().
 * Only tokens with $extensions.com.godaddy.classname.property are included. Property may be a string or array of strings (same token value applied to each). Class names match the kebab-case token name (e.g. classnames['font-body-family']).
 */
export async function formatCssClassnames({ dictionary, file }: FormatFnArguments): Promise<string> {
  const fileHeader = await getFileHeader();
  const header = await fileHeader({ file, commentStyle: commentStyles.long });
  const lines = dictionary.allTokens.map(toClassnameLine).filter((x): x is string => x != null);
  return header + lines.join('\n') + '\n';
}

function toClassnameLine(token: TransformedToken): string | null {
  const raw = token.original?.$extensions?.['com.godaddy.classname']?.property;
  if (raw == null) return null;
  const properties = Array.isArray(raw) ? raw : [raw];
  if (properties.length === 0) return null;
  const varExpr = cssVarWithFallback(token.name, tokenResolvedValueForVarFallback(token), {
    dtcgType: tokenDtcgType(token)
  });
  const declarations = properties.map((prop) => `${prop}: ${varExpr}`).join('; ');
  return `.${token.name} { ${declarations}; }`;
}
