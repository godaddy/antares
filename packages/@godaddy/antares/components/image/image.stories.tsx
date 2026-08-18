'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/image-playground.tsx';
import { Image } from './src/index.tsx';

export default getMeta({ title: 'components/Image' });

export const Props = getComponentDocs(Image);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    alt: 'GoDaddy blue brand panel',
    loading: 'eager',
    width: 320,
    height: 180
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL for the image resource.'
    },
    alt: {
      control: 'text',
      description: 'Alternative text announced for the image.'
    },
    loading: {
      control: 'radio',
      options: ['eager', 'lazy'],
      description: 'Native browser loading preference.'
    },
    width: {
      control: 'number',
      description: 'Rendered width in pixels.'
    },
    height: {
      control: 'number',
      description: 'Rendered height in pixels.'
    }
  }
});
