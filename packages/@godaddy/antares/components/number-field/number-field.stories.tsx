'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { NumberFieldBasicExample } from './examples/basic.tsx';
import { NumberFieldControlledExample } from './examples/controlled.tsx';
import { NumberFieldDisabledExample } from './examples/disabled.tsx';
import { NumberFieldFormatOptionsExample } from './examples/format-options.tsx';
import { NumberFieldHideStepperExample } from './examples/hide-stepper.tsx';
import { NumberFieldInvalidExample } from './examples/invalid.tsx';
import {
  NumberFieldPlaygroundExample,
  type NumberFieldPlaygroundExampleProps
} from './examples/number-field-playground.tsx';
import { NumberFieldValueScaleExample } from './examples/value-scale.tsx';
import { NumberField } from './src/index.tsx';

export default getMeta({
  title: 'components/NumberField'
});

export const Props = getComponentDocs(NumberField);

export const Basic = getStory(NumberFieldBasicExample);

export const Controlled = getStory(NumberFieldControlledExample);

export const Invalid = getStory(NumberFieldInvalidExample);

export const Disabled = getStory(NumberFieldDisabledExample);

export const HideStepper = getStory(NumberFieldHideStepperExample);

export const ValueScale = getStory(NumberFieldValueScaleExample);

export const FormatOptions = getStory(NumberFieldFormatOptionsExample);

export const Playground = {
  render: (args: NumberFieldPlaygroundExampleProps) => <NumberFieldPlaygroundExample {...args} />,
  args: {
    label: 'Quantity',
    minValue: 0,
    maxValue: 100,
    placeholder: '0'
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
    isRequired: { control: 'boolean', description: 'Mark as required' }
  }
};
