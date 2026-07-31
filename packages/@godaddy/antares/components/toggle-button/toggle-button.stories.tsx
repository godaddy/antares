'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/toggle-button-playground.tsx';
import { ToggleButtonGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/ToggleButton'
});

export const Props = getComponentDocs(ToggleButtonGroup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    selectionMode: 'single',
    isDisabled: false,
    disallowEmptySelection: false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the buttons within the group'
    },
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be selected at a time'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire group'
    },
    disallowEmptySelection: {
      control: 'boolean',
      description: 'Whether the group requires at least one item to always be selected'
    }
  }
});
