'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/image-playground.tsx';
import { Image } from './src/index.tsx';

export default getMeta({ title: 'components/Image' });

export const Props = getComponentDocs(Image);

export const Default = getStory(DefaultExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
