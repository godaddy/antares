'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/field-playground.tsx';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { FieldGroupIconAccessories } from './examples/icon-accessories.tsx';
import { FieldGroupTrailingControl } from './examples/trailing-control.tsx';
import { FieldGroupLeadingControl } from './examples/leading-control.tsx';
import { FieldGroupBasic } from './examples/basic.tsx';
import { FieldGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/Field'
});

export const Props = getComponentDocs(FieldGroup);

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
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' }
  }
};

export const Basic = getStory(FieldGroupBasic);

export const LeadingControl = getStory(FieldGroupLeadingControl);

export const TrailingControl = getStory(FieldGroupTrailingControl);

export const IconAccessories = getStory(FieldGroupIconAccessories);
