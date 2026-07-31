'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/checkbox-playground.tsx';
import { Checkbox, CheckboxGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/Checkbox',
  component: Checkbox
});

export const Props = getComponentDocs(Checkbox);

export const GroupProps = getComponentDocs(CheckboxGroup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    orientation: 'vertical',
    label: 'Select your preferences',
    description: '',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    errorMessage: 'Please make a selection',
    defaultValue: ['option2']
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the checkboxes'
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
});
