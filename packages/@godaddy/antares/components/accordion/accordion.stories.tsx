'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Accordion } from './src/index.tsx';
import { PlaygroundExample } from './examples/accordion-playground.tsx';

export default getMeta({ title: 'components/Accordion' });

export const Props = getComponentDocs(Accordion);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: { defaultExpandedKeys: ['first'], allowsMultipleExpanded: false, isDisabled: false },
  argTypes: {
    defaultExpandedKeys: {
      control: 'object',
      description: 'Initial item keys. Use [] for all closed and enable multiple expansion for several keys.'
    },
    allowsMultipleExpanded: {
      control: 'boolean',
      description: 'Allows several sections to remain open. React Aria defaults to false.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents interaction with every trigger in the group.'
    }
  }
});
