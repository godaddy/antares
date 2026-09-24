'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Collapsible, CollapsiblePanel } from './src/index.tsx';
import { PlaygroundExample } from './examples/collapsible-playground.tsx';

export default getMeta({ title: 'components/Collapsible' });
export const Props = getComponentDocs(Collapsible);
export const CollapsiblePanelProps = getComponentDocs(CollapsiblePanel);
export const Examples = getExamples('./examples');
export const Playground = getStory(PlaygroundExample, {
  args: {
    defaultExpanded: false,
    isDisabled: false,
    headingText: 'Additional details',
    content: 'Optional content for this section.',
    showStatus: false,
    showIndicator: true
  },
  argTypes: {
    defaultExpanded: { control: 'boolean', description: 'Whether the section starts expanded.' },
    isDisabled: { control: 'boolean', description: 'Prevents interaction with the section trigger.' },
    headingText: { control: 'text', description: 'Text used to identify the section.' },
    content: { control: 'text', description: 'Information revealed when the section expands.' },
    showStatus: { control: 'boolean', description: 'Shows a completion icon and its text label.' },
    showIndicator: { control: 'boolean', description: 'Shows the expansion indicator.' }
  }
});
