import { ContextExample } from './examples/namespace.tsx';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof ContextExample> = {
  title: 'internal/box',
  component: () => null
};

type Story = StoryObj<typeof ContextExample>;

export default meta;

export const slots: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    namespace: {
      description: 'Ordered list of parent slot names that will be used as namespace.',
      type: 'array',
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: 'array' }
      }
    },
    override: {
      description: 'Indicator if a `components` override has been applied to the parent or current component.',
      type: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    assigned: {
      description: 'Object where the key are the assigned slot names and the value are the slot contents.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    }
  }
};

export const env: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    components: {
      description:
        'Mapping of the components that should be replaced. Where the key if the unique identifier of the function and the value the component it should be replaced with.',
      type: 'object',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' }
      }
    },
    window: {
      description: 'Ordered list of parent slot names that will be used as namespace.',
      type: 'function',
      table: {
        defaultValue: { summary: '() => window' },
        type: { summary: 'function' }
      }
    },
    document: {
      description: 'Indicator if a `components` override has been applied to the parent or current component.',
      type: 'function',
      table: {
        defaultValue: { summary: '() => document' },
        type: { summary: 'function' }
      }
    },
    root: {
      description: 'Object where the key are the namespaced slot names and the value are the slot components.',
      type: 'object',
      table: {
        defaultValue: { summary: '() => document' },
        type: { summary: 'function' }
      }
    },
    sprite: {
      description: 'External URL where a pre-generated sprite can be found.',
      type: 'string',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    }
  }
};

export const Namespace: Story = {
  render: (args) => <ContextExample {...args} />
};
