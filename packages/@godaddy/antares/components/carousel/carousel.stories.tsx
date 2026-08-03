'use client';
import { PlaygroundExample } from './examples/carousel-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Carousel } from './src/index.tsx';

export default getMeta({
  title: 'components/Carousel'
});

export const Props = getComponentDocs(Carousel);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    hideDots: false,
    hideNavigationControls: false,
    hideMaskEdges: false
  },
  argTypes: {
    hideDots: { control: 'boolean' },
    hideNavigationControls: { control: 'boolean' },
    hideMaskEdges: { control: 'boolean' }
  }
});
