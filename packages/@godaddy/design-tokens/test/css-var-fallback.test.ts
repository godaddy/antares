import { describe, it, expect } from 'vitest';
import { cssVarWithFallback } from '../src/formats/css-var-fallback';

describe('cssVarWithFallback', function cssVarWithFallbackSuite() {
  it('returns var(--name) when value is null or empty', function returnsVarWhenEmpty() {
    expect(cssVarWithFallback('tokenName')).toBe('var(--tokenName)');
    expect(cssVarWithFallback('tokenName', null)).toBe('var(--tokenName)');
    expect(cssVarWithFallback('tokenName', '')).toBe('var(--tokenName)');
  });

  it('returns var(--name, fallback) for simple values', function returnsVarWithFallback() {
    expect(cssVarWithFallback('color', '#fff')).toBe('var(--color, #fff)');
    expect(cssVarWithFallback('size', '1rem')).toBe('var(--size, 1rem)');
  });

  it('does not quote rgba() or box-shadow list fallbacks without fontFamily type', function unquotedCommas() {
    expect(cssVarWithFallback('scrim', 'rgba(0, 0, 0, 0.4)')).toBe('var(--scrim, rgba(0, 0, 0, 0.4))');
    expect(cssVarWithFallback('shadow', '0 1px 2px red, 0 2px 4px blue')).toBe(
      'var(--shadow, 0 1px 2px red, 0 2px 4px blue)'
    );
  });

  it('quotes comma-separated font stacks when dtcgType is fontFamily', function quotesFontFamilyStacks() {
    expect(cssVarWithFallback('font', 'Arial, sans-serif', { dtcgType: 'fontFamily' })).toBe(
      'var(--font, "Arial, sans-serif")'
    );
    expect(cssVarWithFallback('font', 'system-ui', { dtcgType: 'fontFamily' })).toBe('var(--font, system-ui)');
  });

  it('quotes and escapes fallback when it contains quotes or backslashes', function quotesAndEscapesFallback() {
    expect(cssVarWithFallback('q', 'say "hi"')).toBe('var(--q, "say \\"hi\\"")');
    expect(cssVarWithFallback('b', 'back\\slash')).toBe('var(--b, "back\\\\slash")');
  });

  it('quotes fallback when it has leading or trailing whitespace', function quotesWhitespaceFallback() {
    expect(cssVarWithFallback('space', '  value  ')).toBe('var(--space, "  value  ")');
  });

  it('serializes DTCG shadow objects to box-shadow fallbacks', function shadowFallback() {
    const layer = {
      color: '#0000001a',
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 1, unit: 'px' },
      blur: { value: 2, unit: 'px' },
      spread: { value: 0, unit: 'px' }
    };
    expect(cssVarWithFallback('shadow-surface-base', layer)).toBe(
      'var(--shadow-surface-base, 0px 1px 2px 0px #0000001a)'
    );
  });

  it('omits fallback for unrecognized objects (e.g. composite DTCG types not serialized here)', function omitsFallbackForUnknownObjects() {
    expect(cssVarWithFallback('typography-token', { fontSize: '1rem', fontWeight: 400 })).toBe(
      'var(--typography-token)'
    );
    expect(cssVarWithFallback('border-token', { width: '1px', style: 'solid', color: '#000' })).toBe(
      'var(--border-token)'
    );
  });

  it('serializes an array of two DTCG shadow layers to an unquoted comma-separated box-shadow fallback', function shadowMultiLayerFallback() {
    const layerA = {
      color: 'silver',
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 1, unit: 'px' },
      blur: { value: 2, unit: 'px' },
      spread: { value: 0, unit: 'px' }
    };
    const layerB = {
      color: 'darkgray',
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 2, unit: 'px' },
      blur: { value: 4, unit: 'px' },
      spread: { value: 0, unit: 'px' }
    };
    const out = cssVarWithFallback('shadow-multi', [layerA, layerB]);
    expect(out).toBe('var(--shadow-multi, 0px 1px 2px 0px silver, 0px 2px 4px 0px darkgray)');
    expect(out).not.toContain('"');
  });
});
