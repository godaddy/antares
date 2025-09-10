import type { Meta, StoryObj } from '@storybook/react-vite';
import { Throws } from './examples/throws.tsx';
import React from 'react';

const meta: Meta<typeof Throws> = {
  title: 'utility/error',
  component: () => null
};

type Story = StoryObj<typeof Throws>;

export const Required: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    name: {
      description: 'The name of the package that is throwing the error.',
      type: 'string'
    },
    method: {
      description: 'The name of the method that is throwing the error.',
      type: 'string'
    },
    message: {
      description: 'The message that will be displayed to the user.',
      type: 'string'
    }
  }
};

export const Optional: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    scope: {
      description:
        'The scope of the supplied package name. This is useful when you want to provide more context to the error.',
      type: 'string',
      table: {
        defaultValue: { summary: '@bento' },
        type: { summary: 'string' }
      }
    },
    channel: {
      description:
        'The support channel that the user can use to get help.  This is useful when you want to provide a direct link to the support channel that is related to the error.',
      type: 'string',
      table: {
        defaultValue: { summary: '#bento-support' },
        type: { summary: 'string' }
      }
    },
    docs: {
      description:
        'The link to the documentation that is related to the error.  This is useful when you want to provide more information about the error.',
      type: 'string',
      table: {
        defaultValue: { summary: 'https://bento.bento/docs' },
        type: { summary: 'string' }
      }
    },
    args: {
      description:
        'The arguments to be substituted into the message template.  This is useful when you want to use %s placeholders in the message.',
      type: 'array',
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: 'array' }
      }
    }
  }
};

export default meta;
export const Demo: Story = {
  args: {
    name: 'package-name',
    method: 'function-name',
    message: 'An error occurred'
  },

  render: (args) => <Throws {...args} />
};
