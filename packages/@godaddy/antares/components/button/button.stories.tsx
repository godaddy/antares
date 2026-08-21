'use client';
import { PlaygroundExample } from './examples/button-playground.tsx';
import { getMeta, getComponentDocs, getExamples, getStory } from '@bento/storybook-addon-helpers';
import { Button, LinkButton } from './src/index.tsx';

export default getMeta({
  title: 'components/Button'
});

export const Props = getComponentDocs(Button);

export const LinkButtonProps = getComponentDocs(LinkButton);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    children: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'critical', 'inline', 'minimal'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the button'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    children: {
      control: 'text',
      description: 'Button label text'
    }
  }
});
