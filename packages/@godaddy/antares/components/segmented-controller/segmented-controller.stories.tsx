'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/segmented-controller-playground.tsx';
import { SegmentedController } from './src/index.tsx';

export default getMeta({
  title: 'components/SegmentedController'
});

export const Props = getComponentDocs(SegmentedController);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    isDisabled: false,
    value: 'day'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the segmented controller'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire group'
    },
    value: {
      control: 'select',
      options: ['day', 'week', 'month', 'year'],
      description: 'Value'
    }
  }
});
