'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/telephone-field-playground.tsx';
import { TelephoneFieldBasicExample } from './examples/basic';
import { TelephoneFieldControlledExample } from './examples/controlled';
import { TelephoneFieldDisabledExample } from './examples/disabled';
import { TelephoneFieldInvalidExample } from './examples/invalid';
import { TelephoneFieldSizesExample } from './examples/sizes';
import { TelephoneField } from './src/index.tsx';

export default getMeta({
  title: 'components/TelephoneField'
});

export const Props = getComponentDocs(TelephoneField);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: 'Phone number',
    placeholder: '555-555-5555',
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    size: 'md'
  },
  argTypes: {
    label: { control: 'text', description: 'Label text shown above the field' },
    placeholder: { control: 'text', description: 'Placeholder shown in the phone number input' },
    description: { control: 'text', description: 'Helper text shown below the field' },
    errorMessage: { control: 'text', description: 'Error message shown when the field is invalid' },
    isDisabled: { control: 'boolean', description: 'Prevents interaction with the field' },
    isRequired: { control: 'boolean', description: 'Marks the field as required' },
    isInvalid: { control: 'boolean', description: 'Marks the field as invalid' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Visual size of the field' }
  }
};

export const Basic = getStory(TelephoneFieldBasicExample);

export const Controlled = getStory(TelephoneFieldControlledExample);

export const Invalid = getStory(TelephoneFieldInvalidExample);

export const Disabled = getStory(TelephoneFieldDisabledExample);

export const Sizes = getStory(TelephoneFieldSizesExample);
