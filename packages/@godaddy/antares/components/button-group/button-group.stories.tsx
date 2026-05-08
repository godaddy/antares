'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/button-group-playground.tsx';
import { DefaultExample } from './examples/default.tsx';
import { MultipleSelectionExample } from './examples/multiple-selection.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { IconOnlyExample } from './examples/icon-only.tsx';
import { IconAndTextExample } from './examples/icon-and-text.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { RTLExample } from './examples/rtl.tsx';
import { ButtonGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/ButtonGroup'
});

export const Props = getComponentDocs(ButtonGroup);

export const Default = getStory(DefaultExample);

export const MultipleSelection = getStory(MultipleSelectionExample);

export const Controlled = getStory(ControlledExample);

export const Sizes = getStory(SizesExample);

export const IconOnly = getStory(IconOnlyExample);

export const IconAndText = getStory(IconAndTextExample);

export const Disabled = getStory(DisabledExample);

export const RTL = getStory(RTLExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    size: 'md',
    selectionMode: 'single',
    isDisabled: false,
    disallowEmptySelection: false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the buttons within the group'
    },
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be selected at a time'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire group'
    },
    disallowEmptySelection: {
      control: 'boolean',
      description: 'Whether the group requires at least one item to always be selected'
    }
  }
};
