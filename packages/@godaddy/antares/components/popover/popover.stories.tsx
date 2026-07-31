'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Popover } from './src/index.tsx';
import { PlaygroundExample } from './examples/popover-playground.tsx';

export default getMeta({
  title: 'components/Popover'
});

export const Props = getComponentDocs(Popover);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    placement: 'bottom',
    hideArrow: false,
    showCloseButton: false
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'top start', 'top end', 'left', 'right'],
      description: 'Popover placement relative to the trigger'
    },
    hideArrow: {
      control: 'boolean',
      description: 'Hide the popover arrow'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show a close button in the header'
    }
  }
});
