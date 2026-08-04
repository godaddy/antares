'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { NumberFieldPlaygroundExample } from './examples/number-field-playground.tsx';
import { NumberField } from './src/index.tsx';

export default getMeta({
  title: 'components/NumberField'
});

export const Props = getComponentDocs(NumberField);

export const Examples = getExamples('./examples');

export const Playground = getStory(NumberFieldPlaygroundExample, {
  args: {
    label: 'Quantity',
    minValue: 0,
    maxValue: 100,
    placeholder: '0',
    size: 'md'
  },
  argTypes: {
    label: { control: 'text', description: 'Label text shown above the frame' },
    description: { control: 'text', description: 'Helper text shown below the frame' },
    errorMessage: { control: 'text', description: 'Error message when invalid' },
    placeholder: { control: 'text', description: 'Placeholder when empty' },
    minValue: { control: 'number', description: 'Minimum value' },
    maxValue: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Step for increment/decrement' },
    hideStepper: { control: 'boolean', description: 'Hide +/- stepper buttons' },
    isDisabled: { control: 'boolean', description: 'Disable the input' },
    isInvalid: { control: 'boolean', description: 'Show invalid state' },
    isRequired: { control: 'boolean', description: 'Mark as required' },
    size: { control: 'select', options: ['sm', 'md'], description: 'Visual size' }
  }
});
