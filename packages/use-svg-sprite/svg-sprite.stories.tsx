import type { Meta, StoryObj } from '@storybook/react';
import { useSVGSprite } from './src';
import { BasicUsage } from './examples/basic';
import { MultipleIcons } from './examples/multiple';

import React from 'react';

const meta: Meta = {
  title: 'Hooks/use-svg-sprite',
  component: () => null
};

export default meta;

export const useSVGSpriteMeta = {
  name: 'useSVGSprite',
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    name: {
      description: 'The name of the SVG that should be added to the SVG sprite sheet',
      type: { name: 'string', required: true },
      control: 'text'
    },
    Graphic: {
      description: 'The component that renders the SVG content for the sprite sheet',
      type: { name: 'ReactElement', required: true },
      control: 'object'
    }
  }
};

export const BasicUsageStory: StoryObj = {
  name: 'Basic Icon',
  render: () => <BasicUsage />
};

export const MultipleIconStory: StoryObj = {
  name: 'Multiple Icons',
  render: () => <MultipleIcons />
};
