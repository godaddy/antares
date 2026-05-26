'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/select-playground.tsx';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SelectControlledExample } from './examples/select-controlled.tsx';
import { SelectMultipleExample } from './examples/select-multiple.tsx';
import { SelectDynamicExample } from './examples/select-dynamic.tsx';
import { SelectStaticExample } from './examples/select-static.tsx';
import { Select } from './src/index.tsx';

export default getMeta({
  title: 'components/Select'
});

export const Props = getComponentDocs(Select);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    label: 'Pick a drink',
    placeholder: 'Select an option',
    size: 'md',
    labelStyle: 'default',
    selectionMode: 'single',
    isDisabled: false,
    isRequired: false,
    isInvalid: false
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    labelStyle: { control: 'select', options: ['default', 'float'] },
    selectionMode: { control: 'select', options: ['single', 'multiple'] },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' }
  }
};

export const Static = getStory(SelectStaticExample);

export const Controlled = getStory(SelectControlledExample);

export const DynamicItems = getStory(SelectDynamicExample);

export const Multiple = getStory(SelectMultipleExample);
