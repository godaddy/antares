'use client';
import { PlaygroundExample } from './examples/text-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Text } from './src/index.tsx';

export default getMeta({
  title: 'components/Text'
});

export const Props = getComponentDocs(Text);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    as: 'span',
    children: 'The quick brown fox jumps over the lazy dog.'
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'justify'] },
    as: { control: 'select', options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] },
    maxLines: { control: 'number' },
    wrap: { control: 'select', options: ['wrap', 'nowrap', 'balance', 'pretty', 'stable'] },
    children: { control: 'text' }
  }
});
