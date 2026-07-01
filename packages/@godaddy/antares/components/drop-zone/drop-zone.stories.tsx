'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { DropZone } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { CustomContentExample } from './examples/custom-content.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/drop-zone-playground.tsx';

export default getMeta({
  title: 'components/DropZone'
});

export const Props = getComponentDocs(DropZone);

export const Default = getStory(DefaultExample);

export const CustomContent = getStory(CustomContentExample);

export const Disabled = getStory(DisabledExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    isDisabled: false
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Whether the drop zone is disabled and cannot accept drops'
    }
  }
};
