'use client';
import { PlaygroundExample } from './examples/flex-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Flex } from './src/index.tsx';

export default getMeta({
  title: 'components/Layout/Flex'
});

export const Props = getComponentDocs(Flex);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    direction: 'row',
    gap: 'md',
    as: 'div'
  },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    justifyContent: {
      control: 'select',
      options: ['normal', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']
    },
    alignItems: { control: 'select', options: ['normal', 'start', 'end', 'center', 'stretch', 'baseline'] },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
});
