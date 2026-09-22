'use client';
import { PlaygroundExample } from './examples/text-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Detail, Text } from './src/index.tsx';

export default getMeta({
  title: 'components/Text'
});

export const Props = getComponentDocs(Text);

export const DetailProps = getComponentDocs(Detail);

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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Step on the body ramp. Inherits when omitted'
    },
    emphasis: {
      control: 'select',
      options: ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral', 'passive'],
      description: 'Feedback color. Inherits when omitted'
    },
    children: { control: 'text' }
  }
});
