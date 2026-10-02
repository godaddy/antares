'use client';
import { PlaygroundExample } from './examples/pagination-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Pagination, PaginationDots } from './src/index.tsx';

export default getMeta({
  title: 'components/Pagination'
});

export const Props = getComponentDocs(Pagination);

export const PaginationDotsProps = getComponentDocs(PaginationDots);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    composition: 'known',
    pageCount: 5,
    size: 'md',
    isDisabled: false
  },
  argTypes: {
    composition: {
      control: 'select',
      options: ['known', 'unknown', 'minimal', 'dots'],
      description: 'Pagination anatomy rendered by the playground.'
    },
    pageCount: {
      control: 'number',
      description: 'Number of pages for known-count and dots compositions.'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Visual scale of the Pagination composition.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the composed Pagination controls.'
    }
  }
});
