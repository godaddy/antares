'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/range-field-playground.tsx';
import { RangeField } from './src/index.tsx';

export default getMeta({ title: 'components/RangeField' });

export const Props = getComponentDocs(RangeField);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: 'Volume',
    description: '',
    value: undefined,
    defaultValue: 50,
    minValue: 0,
    maxValue: 100,
    step: 10,
    markers: true,
    valueLabel: undefined,
    minLabel: '',
    maxLabel: '',
    thumbLabels: [],
    isDisabled: false
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label above the field' },
    description: { control: 'text', description: 'Helper text below the field' },
    value: {
      control: 'object',
      description: 'Current value or values for controlled usage; unset to use defaultValue'
    },
    defaultValue: { control: 'object', description: 'Initial value or range values' },
    minValue: { control: 'number', description: 'Minimum allowed value' },
    maxValue: { control: 'number', description: 'Maximum allowed value' },
    step: { control: 'number', description: 'Increment and snap interval' },
    markers: { control: 'boolean', description: 'Show a marker at each step position' },
    valueLabel: { control: 'text', description: 'Text displayed opposite the field label' },
    minLabel: { control: 'text', description: 'Content displayed at the minimum end of the track' },
    maxLabel: { control: 'text', description: 'Content displayed at the maximum end of the track' },
    thumbLabels: { control: 'object', description: 'Accessible labels for each thumb' },
    isDisabled: { control: 'boolean', description: 'Disable every thumb' }
  }
});
