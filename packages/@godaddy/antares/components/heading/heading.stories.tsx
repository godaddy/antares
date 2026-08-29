'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Heading } from './src/index.tsx';
import { PlaygroundExample } from './examples/heading-playground.tsx';

export default getMeta({
  title: 'components/Heading'
});

export const Props = getComponentDocs(Heading);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    level: 2,
    children: 'Heading'
  },
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6], description: 'Heading level, rendered as h1-h6' },
    children: { control: 'text', description: 'Heading content' }
  }
});
