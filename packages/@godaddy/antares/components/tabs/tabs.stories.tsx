'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/tabs-playground.tsx';
import { Tabs } from './src/index.tsx';

export default getMeta({ title: 'components/Tabs' });

export const Props = getComponentDocs(Tabs);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    design: 'underline',
    keyboardActivation: 'automatic'
  },
  argTypes: {
    design: {
      control: 'radio',
      options: ['underline', 'manilla'],
      description: 'Visual treatment for the tab group'
    },
    keyboardActivation: {
      control: 'radio',
      options: ['automatic', 'manual'],
      description: 'Whether keyboard focus activates a tab immediately'
    }
  }
});
