'use client';
import { PlaygroundExample } from './examples/box-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Box } from './src/index.tsx';

export default getMeta({
  title: 'components/Layout/Box'
});

export const Props = getComponentDocs(Box);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    padding: 'md',
    as: 'div'
  },
  argTypes: {
    padding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    elevation: { control: 'select', options: ['base', 'card', 'raised', 'overlay'] },
    rounding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
});
