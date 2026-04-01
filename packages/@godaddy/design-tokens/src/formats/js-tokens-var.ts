import { commentStyles } from 'style-dictionary/enums';
import type { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { cssVarWithFallback, tokenDtcgType, tokenResolvedValueForVarFallback } from './css-var-fallback.ts';
import { getFileHeader } from './file-header.ts';
/*
  import styled from 'styled-components';
  import { tokens } from '@godaddy/design-tokens/css-in-js';

  const StyledComponent = styled.div`
    font-family: ${tokens['font-body-family']};
  `;
*/

/**
 * Style Dictionary format: CSS-in-JS object mapping quoted kebab-case name -> var(--name, fallback).
 */
export async function formatJsTokensVar({ dictionary, file }: FormatFnArguments): Promise<string> {
  const fileHeader = await getFileHeader();
  const header = await fileHeader({ file, commentStyle: commentStyles.short });
  const lines = dictionary.allTokens.map(toJsTokenLine);
  return header + `export const tokens = {${lines.join(',\n  ')}};\n`;
}

function toJsTokenLine(token: TransformedToken): string {
  const varExpr = cssVarWithFallback(token.name, tokenResolvedValueForVarFallback(token), {
    dtcgType: tokenDtcgType(token)
  });
  return `${JSON.stringify(token.name)}: ${JSON.stringify(varExpr)}`;
}
