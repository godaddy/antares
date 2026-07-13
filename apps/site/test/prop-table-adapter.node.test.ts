import { describe, expect, it } from 'vitest';
import { toPropTable } from '../lib/prop-table-adapter';

describe('toPropTable', function toPropTableTests() {
  it('maps neutral docs to entries + categories preserving order', function mapsDocs() {
    const result = toPropTable({
      name: 'Thing',
      props: [
        { name: 'children', type: 'ReactNode', required: false, defaultValue: null },
        { name: 'onPress', type: '() => void', required: false, description: 'Fired on press.', category: 'Events' },
        { name: 'onChange', type: '() => void', required: false, category: 'Events' },
        { name: 'aria-label', type: 'string', required: false, category: 'ARIA' }
      ]
    });

    expect(result.entries).toEqual([
      {
        name: 'children',
        type: 'ReactNode',
        default: undefined,
        description: undefined,
        required: false,
        deprecated: undefined
      },
      {
        name: 'onPress',
        type: '() => void',
        default: undefined,
        description: 'Fired on press.',
        required: false,
        deprecated: undefined
      },
      {
        name: 'onChange',
        type: '() => void',
        default: undefined,
        description: undefined,
        required: false,
        deprecated: undefined
      },
      {
        name: 'aria-label',
        type: 'string',
        default: undefined,
        description: undefined,
        required: false,
        deprecated: undefined
      }
    ]);

    // Insertion order = declaration order after processing.
    expect(Object.keys(result.categories)).toEqual(['Events', 'ARIA']);
    expect(result.categories).toEqual({ Events: ['onPress', 'onChange'], ARIA: ['aria-label'] });
  });

  it('maps defaultValue and deprecated', function mapsExtras() {
    const result = toPropTable({
      name: 'Thing',
      props: [{ name: 'size', type: "'sm' | 'lg'", required: true, defaultValue: "'sm'", deprecated: true }]
    });

    expect(result.entries[0]).toEqual({
      name: 'size',
      type: "'sm' | 'lg'",
      default: "'sm'",
      description: undefined,
      required: true,
      deprecated: true
    });
    expect(result.categories).toEqual({});
  });
});
