'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { DropZone } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { FileUploadExample } from './examples/file-upload.tsx';
import { DropTargetLabelExample } from './examples/drop-target-label.tsx';
import { ReplaceFileExample } from './examples/replace-file.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/drop-zone-playground.tsx';

export default getMeta({
  title: 'components/DropZone'
});

export const Props = getComponentDocs(DropZone);

export const Default = getStory(DefaultExample);

export const Disabled = getStory(DisabledExample);

export const FileUpload = getStory(FileUploadExample);

export const DropTargetLabel = getStory(DropTargetLabelExample);

export const ReplaceFile = getStory(ReplaceFileExample);

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
