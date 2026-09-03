'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { TextArea } from './src/index.tsx';
import { PlaygroundExample } from './examples/text-area-playground.tsx';

export default getMeta({
  title: 'components/TextArea'
});

export const Props = getComponentDocs(TextArea);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample);
