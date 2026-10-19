'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/skeleton-playground.tsx';
import { Skeleton } from './src/index.tsx';

export default getMeta({
  title: 'components/Skeleton'
});

export const Props = getComponentDocs(Skeleton);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    rounding: 'default',
    width: '',
    height: ''
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Height preset.'
    },
    rounding: {
      control: 'radio',
      options: ['default', 'full', 'none'],
      description: 'Corner rounding.'
    },
    width: {
      control: 'text',
      description: 'Width as a size preset or CSS length. Defaults to 100%.'
    },
    height: {
      control: 'text',
      description: 'Custom height as a CSS length. Overrides size.'
    }
  }
});
