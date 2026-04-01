/**
 * Register shared parsers, transforms, and formats with Style Dictionary, then run the build.
 * Run with: npx tsx src/build-tokens.ts
 * @module build-tokens
 */
import StyleDictionary from 'style-dictionary';
import { parse } from 'yaml';
import {
  formatScssVariablesVar,
  formatJsTokensVar,
  formatCssClassnames,
  formatVscodeCssCustomData
} from './formats/index.ts';

StyleDictionary.registerParser({
  name: 'tokens-yml',
  pattern: /\.ya?ml$/,
  parser: ({ contents }: { contents: string }) => parse(contents)
});

StyleDictionary.registerFormat({
  name: 'scss/tokens-var',
  format: formatScssVariablesVar
});

StyleDictionary.registerFormat({
  name: 'js/tokens-var',
  format: formatJsTokensVar
});

StyleDictionary.registerFormat({
  name: 'css/classnames',
  format: formatCssClassnames
});

StyleDictionary.registerFormat({
  name: 'vscode/css-custom-data',
  format: formatVscodeCssCustomData
});

const sd = new StyleDictionary('src/sd.config.json');
await sd.init();
await sd.buildAllPlatforms();
