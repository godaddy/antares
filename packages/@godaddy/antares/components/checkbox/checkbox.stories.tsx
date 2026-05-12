'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { CheckboxBasic } from './examples/basic.tsx';
import { CheckboxIndeterminate } from './examples/indeterminate.tsx';
import { CheckboxGroupBasic } from './examples/group.tsx';
import { CheckboxGroupHorizontal } from './examples/horizontal.tsx';
import { CheckboxGroupControlled } from './examples/controlled.tsx';
import { CheckboxGroupRequired } from './examples/required.tsx';
import { CheckboxGroupDisabled } from './examples/disabled.tsx';
import { CheckboxGroupInvalid } from './examples/invalid.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/playground.tsx';

export default getMeta({
  title: 'components/Checkbox',
  component: CheckboxBasic
});

export const Props = getComponentDocs(CheckboxGroupBasic);

export const Basic = getStory(CheckboxBasic);

export const Indeterminate = getStory(CheckboxIndeterminate);

export const Group = getStory(CheckboxGroupBasic);

export const Horizontal = getStory(CheckboxGroupHorizontal);

export const Controlled = getStory(CheckboxGroupControlled);

export const Required = getStory(CheckboxGroupRequired);

export const Disabled = getStory(CheckboxGroupDisabled);

export const Invalid = getStory(CheckboxGroupInvalid);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    direction: 'column',
    label: 'Select your preferences',
    description: '',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    errorMessage: 'Please make a selection',
    defaultValue: ['option2']
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Layout direction of checkboxes'
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox group'
    },
    description: {
      control: 'text',
      description: 'Help text below the checkbox group'
    },
    isRequired: {
      control: 'boolean',
      description: 'Mark the field as required'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire checkbox group'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Show validation error state'
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Show indeterminate state for all checkboxes'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when isInvalid is true'
    },
    defaultValue: {
      control: 'object',
      description: 'Initially selected values (array of strings)'
    }
  }
};
