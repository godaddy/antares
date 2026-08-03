'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/radio-playground.tsx';
import { Radio, RadioGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/Radio'
});

export const Props = getComponentDocs(Radio);

export const GroupProps = getComponentDocs(RadioGroup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    orientation: 'vertical',
    label: 'Select your plan',
    description: '',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    errorMessage: 'Please make a selection',
    defaultValue: 'standard'
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of radio buttons'
    },
    label: {
      control: 'text',
      description: 'Label text for the radio group'
    },
    description: {
      control: 'text',
      description: 'Help text below the radio group'
    },
    isRequired: {
      control: 'boolean',
      description: 'Mark the field as required'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire radio group'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Show validation error state'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when isInvalid is true'
    },
    defaultValue: {
      control: 'select',
      options: ['basic', 'standard', 'premium'],
      description: 'Initially selected value'
    }
  }
});
