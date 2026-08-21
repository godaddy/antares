'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Pressable } from './src/index.tsx';
import { PlaygroundExample } from './examples/pressable-playground.tsx';

export default getMeta({ title: 'components/Pressable' });

export const Props = getComponentDocs(Pressable);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    isDisabled: false
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Whether the pressable is disabled.'
    }
  }
});
