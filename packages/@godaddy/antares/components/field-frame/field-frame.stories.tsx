'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/field-frame-playground.tsx';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { FieldFrameIconAccessories } from './examples/icon-accessories.tsx';
import { FieldFrameTrailingControl } from './examples/trailing-control.tsx';
import { FieldFrameLeadingControl } from './examples/leading-control.tsx';
import { FieldFrameBasic } from './examples/basic.tsx';
import { FieldFrame } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/FieldFrame'
});

export const Props = getComponentDocs(FieldFrame);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: 'Label',
    isRequired: false,
    isDisabled: false
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' }
  }
};

export const Basic = getStory(FieldFrameBasic);

export const LeadingControl = getStory(FieldFrameLeadingControl);

export const TrailingControl = getStory(FieldFrameTrailingControl);

export const IconAccessories = getStory(FieldFrameIconAccessories);
