'use client';
import { PlaygroundExample } from './examples/select-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Select } from './src/index.tsx';

export default getMeta({
  title: 'components/Select'
});

export const Props = getComponentDocs(Select);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: 'Coffee',
    placeholder: 'Pick a drink',
    selectionMode: 'single',
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    size: 'md'
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    selectionMode: { control: 'select', options: ['single', 'multiple'] },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] }
  }
});
