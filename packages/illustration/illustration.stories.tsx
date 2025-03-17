import { RotateSVG } from './examples/rotate-illustration.tsx';
import { RenderingSvg } from './examples/rendering-svg.tsx';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof RenderingSvg> = {
  title: 'components/illustration',
  component: () => null,
  argTypes: {
    flip: {
      options: ['none', 'horizontal', 'vertical'],
      control: { type: 'radio' }
    },
    rotate: {
      options: [0, 90, 180, 270],
      control: { type: 'radio' }
    }
  }
};

type Story = StoryObj<typeof RenderingSvg>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
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
    title: 'A play button'
  },
  render: (args) => <RenderingSvg {...args} />
};

export const Rotate: Story = {
  render: (args) => <RotateSVG {...args} />
};
