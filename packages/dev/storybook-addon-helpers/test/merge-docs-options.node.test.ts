import { describe, expect, it } from 'vitest';
import { mergeDocsOptions } from '../src/process.ts';

describe('mergeDocsOptions', function mergeDocsOptionsTests() {
  it('returns the call options unchanged when there are no defaults', function noDefaults() {
    expect(mergeDocsOptions(undefined, { primary: ['a'] })).toEqual({ primary: ['a'] });
  });

  it('inherits keys absent on the call from the defaults', function inherit() {
    const merged = mergeDocsOptions({ categories: { Events: [/^on/] }, exclude: ['size'] }, { primary: ['label'] });
    expect(merged).toEqual({ primary: ['label'], categories: { Events: [/^on/] }, exclude: ['size'] });
  });

  it('replaces a present key wholesale (categories are not deep-merged)', function replaceKey() {
    const merged = mergeDocsOptions({ categories: { Events: [/^on/] } }, { categories: { Layout: ['x'] } });
    expect(merged).toEqual({ categories: { Layout: ['x'] } });
  });

  it('drops the defaults filter when the call sets include (filter is one unit)', function callInclude() {
    const merged = mergeDocsOptions({ exclude: ['size'] }, { include: ['label'] });
    expect(merged).toEqual({ include: ['label'] });
    expect(merged).not.toHaveProperty('exclude');
  });

  it('drops the defaults filter when the call sets exclude', function callExclude() {
    const merged = mergeDocsOptions({ include: ['label'] }, { exclude: ['size'] });
    expect(merged).toEqual({ exclude: ['size'] });
    expect(merged).not.toHaveProperty('include');
  });

  it('keeps the defaults filter when the call sets no filter', function inheritFilter() {
    const merged = mergeDocsOptions({ exclude: ['size'] }, { primary: ['label'] });
    expect(merged).toEqual({ primary: ['label'], exclude: ['size'] });
  });

  it('omits keys that are undefined on both sides', function noUndefinedKeys() {
    const merged = mergeDocsOptions({}, {});
    expect(Object.keys(merged)).toEqual([]);
  });
});
