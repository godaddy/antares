'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { FieldError } from './src/index.tsx';
import { PlaygroundExample } from './examples/field-error-playground.tsx';

export default getMeta({
  title: 'components/FieldError'
});

export const Props = getComponentDocs(FieldError);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample);
