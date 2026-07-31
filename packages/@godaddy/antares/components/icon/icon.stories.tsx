'use client';
import { PlaygroundExample } from './examples/icon-playground.tsx';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';

export default getMeta({
  title: 'components/Icon',
  component: DefaultExample,
  args: {
    icon: 'star'
  }
});

export const Playground = getStory(PlaygroundExample, {
  args: {
    icon: 'star',
    width: 24,
    height: 24
  },
  argTypes: {
    icon: { control: 'text' },
    color: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' }
  }
});

export const Icon = getStory(DefaultExample);

export const Props = getComponentDocs(DefaultExample);
