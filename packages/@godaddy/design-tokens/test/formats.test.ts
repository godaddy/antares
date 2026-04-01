import { describe, it, expect } from 'vitest';
import { formatScssVariablesVar } from '../src/formats/scss-tokens-var';
import { formatJsTokensVar } from '../src/formats/js-tokens-var';
import { formatCssClassnames } from '../src/formats/css-classnames';
import { formatVscodeCssCustomData } from '../src/formats/css-custom-data';
import type { TransformedToken } from 'style-dictionary/types';

/** Minimal Style Dictionary token shape for format tests */
function makeToken({
  name = 'test-token',
  value = '1rem',
  type = 'dimension',
  description,
  extensions
}: {
  name?: string;
  value?: string;
  type?: string;
  description?: string;
  extensions?: Record<string, { property?: string | string[] }>;
} = {}): TransformedToken {
  const token = {
    name,
    path: [name],
    $value: value,
    filePath: '',
    isSource: true,
    original: {
      $value: value,
      $type: type,
      ...(description != null && { $description: description }),
      ...(extensions != null && { $extensions: extensions })
    }
  } as TransformedToken;
  if (description != null) (token as TransformedToken & { $description?: string }).$description = description;
  return token;
}

/** Mock file for formats that use fileHeader */
function makeFile(): { destination: string } {
  return { destination: 'test-output.txt' };
}

describe('formatScssVariablesVar', function formatScssSuite() {
  it('outputs a file header and SCSS variable per token', async function scssHeaderAndVariables() {
    const dictionary = {
      allTokens: [makeToken({ name: 'size-md', value: '1rem' }), makeToken({ name: 'color-primary', value: '#0066cc' })]
    };
    const out = await formatScssVariablesVar({ dictionary, file: makeFile() } as Parameters<
      typeof formatScssVariablesVar
    >[0]);
    expect(out).toMatch(/Do not edit|auto-generated/);
    expect(out).toContain('$size-md: var(--size-md, 1rem) !default;');
    expect(out).toContain('$color-primary: var(--color-primary, #0066cc) !default;');
  });

  it('quotes fontFamily fallback when the stack contains commas', async function scssQuotesFontStack() {
    const dictionary = {
      allTokens: [makeToken({ name: 'font-body', value: 'Arial, sans-serif', type: 'fontFamily' })]
    };
    const out = await formatScssVariablesVar({ dictionary, file: makeFile() } as Parameters<
      typeof formatScssVariablesVar
    >[0]);
    expect(out).toContain('var(--font-body, "Arial, sans-serif")');
  });
});

describe('formatJsTokensVar', function formatJsSuite() {
  it('outputs a file header and export const tokens with name -> var()', async function jsHeaderAndExport() {
    const dictionary = {
      allTokens: [makeToken({ name: 'font-body-family', value: 'system-ui, sans-serif', type: 'fontFamily' })]
    };
    const out = await formatJsTokensVar({ dictionary, file: makeFile() } as Parameters<typeof formatJsTokensVar>[0]);
    expect(out).toMatch(/Do not edit|auto-generated/);
    expect(out).toContain('export const tokens = {');
    expect(out).toContain('"font-body-family": "var(--font-body-family, \\"system-ui, sans-serif\\")"');
  });
});

describe('formatCssClassnames', function formatClassnamesSuite() {
  it('includes only tokens with $extensions.com.godaddy.classname.property', async function classnamesIncludesOnlyWithExtension() {
    const dictionary = {
      allTokens: [
        makeToken({
          name: 'font-body-family',
          value: 'system-ui, sans-serif',
          type: 'fontFamily',
          extensions: {
            'com.godaddy.classname': { property: 'font-family' }
          }
        }),
        makeToken({ name: 'size-sm', value: '0.875rem' })
      ]
    };
    const out = await formatCssClassnames({ dictionary, file: makeFile() } as Parameters<
      typeof formatCssClassnames
    >[0]);
    expect(out).toContain('.font-body-family { font-family: var(--font-body-family, "system-ui, sans-serif"); }');
    expect(out).not.toContain('size-sm');
  });

  it('applies token to multiple properties when property is an array', async function classnamesMultipleProperties() {
    const dictionary = {
      allTokens: [
        makeToken({
          name: 'size-space-md',
          value: '1rem',
          extensions: {
            'com.godaddy.classname': { property: ['padding', 'gap'] }
          }
        })
      ]
    };
    const out = await formatCssClassnames({ dictionary, file: makeFile() } as Parameters<
      typeof formatCssClassnames
    >[0]);
    expect(out).toContain('.size-space-md { padding: var(--size-space-md, 1rem); gap: var(--size-space-md, 1rem); }');
  });

  it('outputs no rules when no tokens have the classname extension', async function classnamesNoRulesWhenNone() {
    const dictionary = {
      allTokens: [makeToken({ name: 'size-md', value: '1rem' })]
    };
    const out = await formatCssClassnames({ dictionary, file: makeFile() } as Parameters<
      typeof formatCssClassnames
    >[0]);
    expect(out).toMatch(/Do not edit|auto-generated/);
    expect(out).not.toMatch(/\.\\\$/);
    expect(out).not.toContain('size-md');
  });
});

describe('formatVscodeCssCustomData', function formatCssDataSuite() {
  it('returns JSON with version 1.1 and properties array', function cssDataVersionAndProperties() {
    const dictionary = {
      allTokens: [makeToken({ name: 'color-primary', description: 'Brand primary' }), makeToken({ name: 'size-md' })]
    };
    const out = formatVscodeCssCustomData({ dictionary });
    const data = JSON.parse(out);
    expect(data.version).toBe(1.1);
    expect(Array.isArray(data.properties)).toBe(true);
    expect(data.properties).toHaveLength(2);
  });

  it('maps each token name to a CSS custom property for autocomplete (name is `--` + kebab-case token)', function cssDataPropertyName() {
    const dictionary = {
      allTokens: [makeToken({ name: 'test-var' })]
    };
    const out = formatVscodeCssCustomData({ dictionary });
    const data = JSON.parse(out);
    expect(data.properties[0].name).toBe('--test-var');
  });

  it('includes description when token has $description', function cssDataIncludesDescription() {
    const dictionary = {
      allTokens: [makeToken({ name: 'x', description: 'A token for x' })]
    };
    const out = formatVscodeCssCustomData({ dictionary });
    const data = JSON.parse(out);
    expect(data.properties[0].description).toBe('A token for x');
  });

  it('omits description when missing or empty', function cssDataOmitsEmptyDescription() {
    const dictionary = {
      allTokens: [makeToken({ name: 'a' }), makeToken({ name: 'b', description: '   ' })]
    };
    const out = formatVscodeCssCustomData({ dictionary });
    const data = JSON.parse(out);
    expect(data.properties[0]).not.toHaveProperty('description');
    expect(data.properties[1]).not.toHaveProperty('description');
  });
});
