'use client';
import { PlaygroundExample } from './examples/pagination-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Pagination } from './src/index.tsx';

export default getMeta({
  title: 'components/Pagination'
});

export const Props = getComponentDocs(Pagination);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    total: 10,
    variant: 'dots',
    hideControls: false,
    limit: 1
  },
  argTypes: {
    total: { control: 'number' },
    variant: { control: 'select', options: ['dots', 'none'] },
    hideControls: { control: 'boolean' },
    limit: { control: 'number' }
  }
});
