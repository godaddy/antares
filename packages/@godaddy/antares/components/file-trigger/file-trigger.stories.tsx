'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { FileTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/file-trigger-playground.tsx';

export default getMeta({
  title: 'components/FileTrigger'
});

export const Props = getComponentDocs(FileTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    allowsMultiple: false,
    acceptDirectory: false
  },
  argTypes: {
    allowsMultiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected at once'
    },
    acceptDirectory: {
      control: 'boolean',
      description: 'Whether directories can be selected instead of individual files'
    }
  }
});
