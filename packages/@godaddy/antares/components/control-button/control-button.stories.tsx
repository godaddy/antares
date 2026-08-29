'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ControlButton } from './src/index.tsx';
import { PlaygroundExample } from './examples/control-button-playground.tsx';

export default getMeta({
  title: 'components/ControlButton'
});

export const Props = getComponentDocs(ControlButton);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample);
