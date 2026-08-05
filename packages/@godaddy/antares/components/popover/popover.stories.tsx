'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Popover, PopoverTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/popover-playground.tsx';

export default getMeta({
  title: 'components/Popover'
});

export const Props = getComponentDocs(Popover);

export const PopoverTriggerProps = getComponentDocs(PopoverTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    placement: 'bottom',
    hideArrow: false,
    showHeader: false
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
    showHeader: {
      control: 'boolean',
      description: 'Compose a Header with a title and close button'
    }
  }
});
