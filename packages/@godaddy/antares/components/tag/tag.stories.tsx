'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Tag } from './src/index.tsx';
import { PlaygroundExample } from './examples/tag-playground.tsx';

export default getMeta({
  title: 'components/Tag'
});

export const Props = getComponentDocs(Tag);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    emphasis: 'passive',
    size: 'sm',
    design: 'filled',
    highContrast: false,
    indicator: false,
    children: 'Tag'
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['passive', 'critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral'],
      description: 'The semantic emphasis of the tag'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tag'
    },
    design: {
      control: 'select',
      options: ['filled', 'inline'],
      description: 'The visual design mode'
    },
    highContrast: {
      control: 'boolean',
      description: 'Enable high-contrast color variant'
    },
    indicator: {
      control: 'boolean',
      description: 'Show indicator dot'
    },
    children: {
      control: 'text',
      description: 'The tag label text'
    }
  }
});
