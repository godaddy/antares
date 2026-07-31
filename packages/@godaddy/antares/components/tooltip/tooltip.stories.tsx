'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Tooltip } from './src/index.tsx';
import { PlaygroundExample } from './examples/tooltip-playground.tsx';

export default getMeta({
  title: 'components/Tooltip'
});

export const Props = getComponentDocs(Tooltip);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    placement: 'bottom',
    hideArrow: false,
    delay: 1500,
    closeDelay: 500
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'top start', 'top end', 'left', 'right'],
      description: 'Tooltip placement relative to the trigger'
    },
    hideArrow: {
      control: 'boolean',
      description: 'Hide the tooltip arrow'
    },
    delay: {
      control: 'number',
      description: 'Delay before tooltip appears on hover (ms)'
    },
    closeDelay: {
      control: 'number',
      description: 'Delay before tooltip closes (ms)'
    }
  }
});
