'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/playground.tsx';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SelectBasic } from './examples/basic';
import { SelectControlledExample } from './examples/controlled';
import { SelectDisabledExample } from './examples/disabled';
import { SelectFormExample } from './examples/form';
import { SelectInvalidExample } from './examples/invalid';
import { SelectMultipleExample } from './examples/multiple';
import { SelectSizesExample } from './examples/sizes';
import { Select } from './src/index.tsx';

export default getMeta({
  title: 'components/Select'
});

export const Props = getComponentDocs(Select);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: 'Coffee',
    placeholder: 'Pick a drink',
    selectionMode: 'single',
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    size: 'md'
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    selectionMode: { control: 'select', options: ['single', 'multiple'] },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] }
  }
};

export const Basic = getStory(SelectBasic);

export const Controlled = getStory(SelectControlledExample);

export const Invalid = getStory(SelectInvalidExample);

export const Disabled = getStory(SelectDisabledExample);

export const Multiple = getStory(SelectMultipleExample);

export const Form = getStory(SelectFormExample);

export const Sizes = getStory(SelectSizesExample);
