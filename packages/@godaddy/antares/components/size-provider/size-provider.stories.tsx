'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SizeProvider } from './src/index.tsx';
import { PlaygroundExample } from './examples/size-provider-playground.tsx';

export default getMeta({ title: 'components/SizeProvider' });

export const Props = getComponentDocs(SizeProvider);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: { size: 'sm' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Size of everything inside the scope' }
  }
});
