'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Input } from './src/index.tsx';
import { PlaygroundExample } from './examples/input-playground.tsx';

export default getMeta({
  title: 'components/Input'
});

export const Props = getComponentDocs(Input);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample);
