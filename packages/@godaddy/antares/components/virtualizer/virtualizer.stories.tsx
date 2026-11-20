'use client';

import { getComponentDocs, getExamples, getMeta, getStory, getTypeDocs } from '@bento/storybook-addon-helpers';
import { Virtualizer, type GridLayoutOptions, type ListLayoutOptions } from './src/index.tsx';
import { PlaygroundExample } from './examples/virtualizer-playground.tsx';

export default getMeta({ title: 'components/Virtualizer' });

export const Props = getComponentDocs(Virtualizer);

export const ListLayoutOptionsProps = getTypeDocs<ListLayoutOptions>();

export const GridLayoutOptionsProps = getTypeDocs<GridLayoutOptions>();

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    itemCount: 10000,
    rowSize: 48,
    viewportHeight: 288
  },
  argTypes: {
    itemCount: {
      control: { type: 'number', min: 0, max: 10000, step: 100 },
      description: 'Number of items in the collection'
    },
    rowSize: {
      control: { type: 'number', min: 40, max: 120, step: 4 },
      description: 'Fixed block size of each item, in CSS pixels'
    },
    viewportHeight: {
      control: { type: 'number', min: 144, max: 640, step: 48 },
      description: 'Block size of the scrolling collection viewport, in CSS pixels'
    }
  }
});
