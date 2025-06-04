import { Example as OverrideClassNameExample } from './examples/override-classname';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof OverrideClassNameExample> = {
  title: 'internal/internal-props',
  component: () => null
};

type Story = StoryObj<typeof OverrideClassNameExample>;

export default meta;

export const useInternalPropsAPI: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The properties object to extract internal props from',
      type: { name: 'object', value: {} },
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      },
      required: true
    },
    prefix: {
      description: 'Optional prefix to remove from the properties (defaults to $$bento-internal-{major}-)',
      type: 'string',
      table: {
        defaultValue: { summary: '$$bento-internal-{major}-' },
        type: { summary: 'string' }
      },
      required: false
    }
  }
};

export const toInternalPropsAPI: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    props: {
      description: 'The properties object to convert to internal props',
      type: { name: 'object', value: {} },
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      },
      required: true
    },
    prefix: {
      description: 'Optional prefix to use for the internal properties (defaults to $$bento-internal-{major}-)',
      type: 'string',
      table: {
        defaultValue: { summary: '$$bento-internal-{major}-' },
        type: { summary: 'string' }
      },
      required: false
    }
  }
};

export const Demo: Story = {
  render: (args) => <OverrideClassNameExample {...args} />
};
