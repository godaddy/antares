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
    showTitle: false,
    showCloseButton: false,
    longContent: false
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
    showTitle: {
      control: 'boolean',
      description: 'Render a Heading slot="title", which also names the dialog'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Render a CloseButton in the top corner, beside the title'
    },
    longContent: {
      control: 'boolean',
      description: 'Use content long enough to wrap, showing that it keeps the full popover width'
    }
  }
});
