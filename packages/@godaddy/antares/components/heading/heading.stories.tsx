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
    level: 3,
    children: 'Heading'
  },
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6], description: 'Heading level, rendered as h1-h6' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Step on the heading ramp. Follows the size scope when omitted'
    },
    emphasis: {
      control: 'select',
      options: ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral', 'passive'],
      description: 'Feedback color. Inherits when omitted'
    },
    children: { control: 'text', description: 'Heading content' }
  }
});
