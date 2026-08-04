'use client';
import { PlaygroundExample } from './examples/listbox-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ListBox } from './src/index.tsx';

export default getMeta({
  title: 'components/ListBox'
});

export const ListBoxProps = getComponentDocs(ListBox);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    'aria-label': 'Coffee',
    selectionMode: 'single'
  },
  argTypes: {
    'aria-label': { control: 'text' },
    selectionMode: { control: 'select', options: ['none', 'single', 'multiple'] }
  }
});
