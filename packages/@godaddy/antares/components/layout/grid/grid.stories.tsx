'use client';
import { PlaygroundExample } from './examples/grid-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Grid } from './src/index.tsx';

export default getMeta({
  title: 'components/Layout/Grid'
});

export const Props = getComponentDocs(Grid);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    columns: 'repeat(3, 1fr)',
    gap: 'md',
    as: 'div'
  },
  argTypes: {
    columns: { control: 'text' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    justifyContent: {
      control: 'select',
      options: ['normal', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']
    },
    alignItems: { control: 'select', options: ['normal', 'start', 'end', 'center', 'stretch', 'baseline'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
});
