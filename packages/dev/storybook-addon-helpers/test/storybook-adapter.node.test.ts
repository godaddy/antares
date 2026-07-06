import { describe, expect, it } from 'vitest';
import { toStorybookArgTypes } from '../src/adapters/storybook.ts';
import type { StorybookArgType } from '../src/types.ts';

describe('toStorybookArgTypes', function toStorybookArgTypesTests() {
  it('maps neutral docs to Storybook argTypes in prop order', function mapsDocs() {
    const expectedSizeArgType = {
      name: 'size',
      description: 'Size description',
      required: true,
      type: { name: "'sm' | 'lg'", required: true },
      table: {
        defaultValue: { summary: "'sm'" },
        category: 'Appearance'
      }
    } satisfies StorybookArgType;

    const actual = toStorybookArgTypes({
      name: 'Thing',
      props: [
        {
          name: 'size',
          type: "'sm' | 'lg'",
          required: true,
          description: 'Size description',
          defaultValue: "'sm'",
          group: 'Appearance'
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: null
        }
      ]
    });

    expect(actual.tags).toEqual(['!dev']);
    expect(Object.keys(actual.argTypes)).toEqual(['size', 'disabled']);
    expect(actual.argTypes.size).toEqual(expectedSizeArgType);
    expect(actual.argTypes.disabled.table).toEqual({
      defaultValue: { summary: null }
    });
  });
});
