'use client';
import { PlaygroundExample } from './examples/text-field-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Button } from '#components/button';
import { FieldError } from '#components/field-error';
import { Input } from '#components/input';
import { Label } from '#components/label';
import { Group } from '#components/structure';
import { Text } from '#components/text';
import { TextArea } from '#components/text-area';
import { TextField } from './src/index.tsx';

export default getMeta({
  title: 'components/TextField'
});

export const Props = getComponentDocs(TextField);

export const LabelProps = getComponentDocs(Label);

export const GroupProps = getComponentDocs(Group);

export const InputProps = getComponentDocs(Input);

export const TextAreaProps = getComponentDocs(TextArea);

export const ButtonProps = getComponentDocs(Button);

export const TextProps = getComponentDocs(Text);

export const FieldErrorProps = getComponentDocs(FieldError);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    multiline: false,
    size: 'md'
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
    multiline: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] }
  }
});
