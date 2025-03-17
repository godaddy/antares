import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './examples/container.tsx';

const meta: Meta<typeof Container> = {
  title: 'utility/to-attribute-value',
  component: () => null
};

type Story = StoryObj<typeof Container>;

export default meta;

export const stringify: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    data: {
      description: 'The data that needs to be transformed to a suitable attribute value',
      type: 'any',
      required: true
    },
    separator: {
      description: 'The separator to be used when joining array values. Defaults to a whitespace.',
      type: 'string',
      table: {
        defaultValue: { summary: ' ' },
        type: { summary: 'string' }
      }
    }
  }
};

export const output: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    string: {
      description: 'Strings do not receive any special threatment',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-example="this is a string"' },
        type: { summary: 'string' }
      }
    },
    number: {
      description: 'Numbers are automatically converted using the native `.toString` method',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-example="27.1"' },
        type: { summary: 'number' }
      }
    },
    ['undefined/null']: {
      description: 'Undefined and null values are not added to the data attributes',
      type: 'string',
      table: {
        defaultValue: { summary: '-' },
        type: { summary: 'The data- attribute is ignored' }
      }
    },
    boolean: {
      description:
        'Only trueful boolean values are added to the data attributes, false values follow the same pattern as `null` and `undefined`.',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-loading="true"' },
        type: { summary: 'number' }
      }
    },
    array: {
      description:
        'The values in the array are mapped using this `stringify` function. The resulting strings are then joined into a whitespace-seperated list.',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-example="1 2 foo-bar"' },
        type: { summary: 'array' }
      }
    },
    object: {
      description:
        'The object is transformed into a string using the key as the function name and the value as the argument.',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-example="foo(1) bar(value) baz(string)"' },
        type: { summary: 'object' }
      }
    },
    rest: {
      description: 'Any other value is converted to a string using the native `JSON.stringify` method.',
      type: 'string',
      table: {
        defaultValue: { summary: 'data-example="(ノಠ益ಠ)ノ彡┻━┻"' },
        type: { summary: 'any' }
      }
    }
  }
};

export const Demo: Story = {
  args: {
    example: ['1', '2', 'foo-bar'],
    focused: true,
    transform: { rotate: '45deg' },
    input: 'value'
  },
  render: (args) => <Container {...args} />
};
