'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DropZone } from './src/index.tsx';
import { PlaygroundExample } from './examples/drop-zone-playground.tsx';

export default getMeta({
  title: 'components/DropZone'
});

export const Props = getComponentDocs(DropZone);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    isDisabled: false
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Whether the drop zone is disabled and cannot accept drops'
    }
  }
});
