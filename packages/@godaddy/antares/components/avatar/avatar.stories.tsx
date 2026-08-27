'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/avatar-playground.tsx';
import { Avatar } from './src/index.tsx';

export default getMeta({
  title: 'components/Avatar'
});

export const Props = getComponentDocs(Avatar);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    shape: 'circle',
    size: 'md',
    emphasis: 'primary',
    fallback: 'UT'
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Whether the avatar represents a person or an organization.'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar diameter.'
    },
    emphasis: {
      control: 'select',
      options: [
        'primary',
        'subtle',
        'figure0',
        'figure1',
        'figure2',
        'figure3',
        'figure4',
        'figure5',
        'figure6',
        'figure7',
        'figure8',
        'figure9',
        'figure10',
        'figure11',
        'figure12',
        'figure13',
        'figure14'
      ],
      description: 'Surface color treatment.'
    },
    src: {
      control: 'text',
      description: 'Optional image source URL.'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image.'
    },
    fallback: {
      control: 'text',
      description: 'Monogram or fallback content.'
    }
  }
});
