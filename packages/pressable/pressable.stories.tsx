import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PressableDivExample } from './examples/pressable-div.tsx';
import { PressableLinkExample } from './examples/pressable-link-example.tsx';
import { PressableCustomExample } from './examples/pressable-custom.tsx';

const meta: Meta<typeof PressableDivExample> = {
  title: 'components/pressable',
  component: () => null
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    children: {
      description: 'A single React element that will be made pressable.'
    },
    onPress: {
      description:
        'Handler that is called when the pressable is pressed. Similar to the standard `onClick` event, but normalized to handle all interaction methods consistently.',
      type: 'function'
    },
    onPressStart: {
      description: 'Handler that is called when a press interaction starts.',
      type: 'function'
    },
    onPressEnd: {
      description:
        'Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target.',
      type: 'function'
    },
    onPressChange: {
      description: 'Handler that is called when the press state changes.',
      type: 'function'
    },
    onPressUp: {
      description:
        'Handler that is called when a press is released over the target, regardless of whether it started on the target or not.',
      type: 'function'
    }
  }
};

export const PressableDiv: Story = {
  render: (args) => <PressableDivExample {...args} />
};

export const PressableLink: Story = {
  render: (args) => <PressableLinkExample {...args} />
};

export const PressableCustom: Story = {
  render: (args) => <PressableCustomExample {...args} />
};
