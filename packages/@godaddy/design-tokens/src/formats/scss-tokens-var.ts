import { commentStyles } from 'style-dictionary/enums';
import type { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { cssVarWithFallback, tokenDtcgType, tokenResolvedValueForVarFallback } from './css-var-fallback.ts';
import { getFileHeader } from './file-header.ts';
/*
  @use '@godaddy/design-tokens/scss' as tokens;

  .my-component {
    font-family: tokens.$font-body-family;
  }
*/

/**
 * Style Dictionary format: SCSS variables that reference CSS custom properties (var(--name, fallback)).
 * Use with @use '@godaddy/design-tokens/scss' as tokens.
 */
export async function formatScssVariablesVar({ dictionary, file }: FormatFnArguments): Promise<string> {
  const fileHeader = await getFileHeader();
  const header = await fileHeader({ file, commentStyle: commentStyles.long });
  const lines = dictionary.allTokens.map(toScssVariableLine);
  return header + lines.join('\n') + '\n';
}

function toScssVariableLine(token: TransformedToken): string {
  const varExpr = cssVarWithFallback(token.name, tokenResolvedValueForVarFallback(token), {
    dtcgType: tokenDtcgType(token)
  });
  return `$${token.name}: ${varExpr} !default;`;
}
