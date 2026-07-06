'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { FileTrigger } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { AcceptedTypesExample } from './examples/accepted-types.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/file-trigger-playground.tsx';

export default getMeta({
  title: 'components/FileTrigger'
});

export const Props = getComponentDocs(FileTrigger);

export const Default = getStory(DefaultExample);

export const AcceptedTypes = getStory(AcceptedTypesExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    allowsMultiple: false,
    acceptDirectory: false
  },
  argTypes: {
    allowsMultiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected at once'
    },
    acceptDirectory: {
      control: 'boolean',
      description: 'Whether directories can be selected instead of individual files'
    }
  }
};
