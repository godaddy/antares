'use client';
import { getMeta, getComponentDocs, getExamples, getStory } from '@bento/storybook-addon-helpers';
import { Alert } from './src/index.tsx';
import { PlaygroundExample } from './examples/alert-playground.tsx';

export default getMeta({
  title: 'components/Alert'
});

export const Props = getComponentDocs(Alert);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    emphasis: 'info',
    title: 'Alert title',
    children: 'Optional description text providing additional context.',
    dismissible: false,
    showAction: false
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'],
      description: 'The semantic emphasis of the alert'
    },
    title: {
      control: 'text',
      description: 'The bold heading text'
    },
    children: {
      control: 'text',
      description: 'Optional body text'
    },
    dismissible: {
      control: 'boolean',
      description: 'Show the dismiss button'
    },
    showAction: {
      control: 'boolean',
      description: 'Show an action button'
    }
  }
});
