'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/radio-playground.tsx';
import { RadioDescriptionExample } from './examples/radio-description.tsx';
import { RadioHorizontalExample } from './examples/radio-horizontal.tsx';
import { RadioControlledExample } from './examples/radio-controlled.tsx';
import { RadioAriaLabelExample } from './examples/radio-aria-label.tsx';
import { RadioDisabledExample } from './examples/radio-disabled.tsx';
import { RadioRequiredExample } from './examples/radio-required.tsx';
import { RadioBasicExample } from './examples/radio-basic.tsx';
import { RadioErrorExample } from './examples/radio-error.tsx';
import { RadioFormExample } from './examples/radio-form.tsx';
import { RadioGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/Radio'
});

export const Props = getComponentDocs(RadioGroup);

export const Basic = getStory(RadioBasicExample);

export const Controlled = getStory(RadioControlledExample);

export const Horizontal = getStory(RadioHorizontalExample);

export const Disabled = getStory(RadioDisabledExample);

export const Required = getStory(RadioRequiredExample);

export const Description = getStory(RadioDescriptionExample);

export const ValidationError = getStory(RadioErrorExample);

export const AriaLabel = getStory(RadioAriaLabelExample);

export const Form = getStory(RadioFormExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
