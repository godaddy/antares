'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Collapsible, CollapsiblePanel } from './src/index.tsx';
import { PlaygroundExample } from './examples/collapsible-playground.tsx';

export default getMeta({ title: 'components/Collapsible' });
export const Props = getComponentDocs(Collapsible);
export const CollapsiblePanelProps = getComponentDocs(CollapsiblePanel);
export const Examples = getExamples('./examples');
export const Playground = getStory(PlaygroundExample, {
  args: { defaultExpanded: false, isDisabled: false },
  argTypes: {
    defaultExpanded: { control: 'boolean', description: 'Whether the section starts expanded.' },
    isDisabled: { control: 'boolean', description: 'Prevents interaction with the section trigger.' }
  }
});
