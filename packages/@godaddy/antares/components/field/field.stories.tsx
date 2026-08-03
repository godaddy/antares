'use client';
import { PlaygroundExample } from './examples/field-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { FieldGroup } from './src/index.tsx';

export default getMeta({
  title: 'components/Field'
});

export const GroupProps = getComponentDocs(FieldGroup);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: 'Label',
    isRequired: false,
    isDisabled: false
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' }
  }
});
