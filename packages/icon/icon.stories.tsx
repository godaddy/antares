import type { Meta, StoryObj } from '@storybook/react';
import { Awesome } from './examples/ondemand.tsx';
import { Loader } from './examples/loading.tsx';
import { Example } from './examples/icon.tsx';
import React from 'react';

const meta: Meta<typeof Example> = {
  title: 'components/icon',
  component: () => null,
  argTypes: {
    flip: {
      options: ['none', 'horizontal', 'vertical'],
      control: { type: 'radio' }
    },
    rotate: {
      options: [0, 90, 180, 270],
      control: { type: 'radio' }
    },
    mode: {
      options: ['sprite', 'svg'],
      control: { type: 'radio' }
    }
  }
};

type Story = StoryObj<typeof Example>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    icon: {
      description: 'The name or identifier of the icon to be displayed.',
      type: 'string'
    },
    mode: {
      description:
        'The rendering mode when outputting the icon. Either `sprite` or `svg` where `svg` will return the full SVG element, and the `sprite` mode will add the icon to the sprite sheet and reference it.',
      type: 'string',
      table: {
        defaultValue: { summary: 'svg' },
        type: { summary: 'string' }
      }
    },
    title: {
      description:
        'Screen reader accessible title that explains the illustration. Introducing this property automatically changes the `role` attribute from `presentation` to `img`.',
      type: 'string'
    },
    flip: {
      description: 'Flip the illustration horizontally or vertically.',
      type: 'string',
      table: {
        defaultValue: { summary: 'horizontal | vertical' },
        type: { summary: 'string' }
      }
    },
    rotate: {
      description: 'Rotate the illustration by 90, 180, or 270 degrees.',
      type: 'number',
      table: {
        defaultValue: { summary: '90 | 180 | 270' },
        type: { summary: 'number' }
      }
    }
  }
};

export default meta;
export const Demo: Story = {
  args: {
    width: 48,
    height: 48
  },
  render: (args) => <Example {...args} />
};

export const Ondemand: Story = {
  args: {
    icon: 'boxes-stacked',
    width: 24,
    height: 24
  },
  render: (args) => <Awesome {...args} />
};

export const Loading: Story = {
  args: {
    fill: 'crimson',
    icon: 'dragon',
    width: 24,
    height: 24
  },
  render: (args) => <Loader {...args} />
};
