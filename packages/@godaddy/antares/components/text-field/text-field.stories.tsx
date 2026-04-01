'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/text-field-playground.tsx';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { TextFieldAdornmentsExample } from './examples/adornments';
import { TextFieldControlledExample } from './examples/controlled';
import { TextFieldMultilineExample } from './examples/multiline';
import { TextFieldDisabledExample } from './examples/disabled';
import { TextFieldInvalidExample } from './examples/invalid';
import { TextFieldBasic } from './examples/basic';
import { TextField } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/TextField'
});

export const Props = getComponentDocs(TextField);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    multiline: false
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    leadingText: { control: 'text' },
    trailingText: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    multiline: { control: 'boolean' }
  }
};

export const Basic = getStory(TextFieldBasic);

export const Controlled = getStory(TextFieldControlledExample);

export const Invalid = getStory(TextFieldInvalidExample);

export const Disabled = getStory(TextFieldDisabledExample);

export const Adornments = getStory(TextFieldAdornmentsExample);

export const Multiline = getStory(TextFieldMultilineExample);
