'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Label } from './src/index.tsx';
import { PlaygroundExample } from './examples/label-playground.tsx';

export default getMeta({
  title: 'components/Label'
});

export const Props = getComponentDocs(Label);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample);
