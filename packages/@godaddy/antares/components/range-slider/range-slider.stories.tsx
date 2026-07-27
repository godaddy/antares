'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { RangeSliderControlledExample } from './examples/controlled.tsx';
import { RangeSliderDefaultExample } from './examples/default.tsx';
import { RangeSliderDisabledExample } from './examples/disabled.tsx';
import { RangeSliderFormExample } from './examples/form.tsx';
import { RangeSliderLabelsExample } from './examples/labels.tsx';
import { RangeSliderMarkersExample } from './examples/markers.tsx';
import {
  RangeSliderPlaygroundExample,
  type RangeSliderPlaygroundExampleProps
} from './examples/range-slider-playground.tsx';
import { RangeSlider } from './src/index.tsx';

export default getMeta({ title: 'components/RangeSlider' });

export const Props = getComponentDocs(RangeSlider);

export const Default = getStory(RangeSliderDefaultExample);
export const Controlled = getStory(RangeSliderControlledExample);
export const Disabled = getStory(RangeSliderDisabledExample);
export const Labels = getStory(RangeSliderLabelsExample);
export const Markers = getStory(RangeSliderMarkersExample);
export const Form = getStory(RangeSliderFormExample);

export const Playground = {
  render: (args: RangeSliderPlaygroundExampleProps) => <RangeSliderPlaygroundExample {...args} />,
  args: {
    label: 'Price range',
    description: '',
    value: undefined,
    defaultValue: [20, 80] as [number, number],
    minValue: 0,
    maxValue: 100,
    step: 10,
    markers: false,
    valueLabel: undefined,
    minLabel: '',
    maxLabel: '',
    isDisabled: false,
    thumbLabels: ['Minimum', 'Maximum'] as [string, string]
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label above the range slider' },
    description: { control: 'text', description: 'Helper text below the range slider' },
    value: { control: 'object', description: 'Current range for controlled usage; unset to use defaultValue' },
    defaultValue: { control: 'object', description: 'Initial range for uncontrolled usage' },
    minValue: { control: 'number', description: 'Minimum allowed value' },
    maxValue: { control: 'number', description: 'Maximum allowed value' },
    step: { control: 'number', description: 'Increment and snap interval' },
    markers: { control: 'boolean', description: 'Show a marker at each step position' },
    valueLabel: { control: 'text', description: 'Text displayed opposite the range slider label' },
    minLabel: { control: 'text', description: 'Content displayed at the minimum end of the track' },
    maxLabel: { control: 'text', description: 'Content displayed at the maximum end of the track' },
    isDisabled: { control: 'boolean', description: 'Disable both thumbs' },
    thumbLabels: { control: 'object', description: 'Accessible labels for the start and end thumbs' },
    thumbNames: { control: 'object', description: 'Form input names for the start and end thumbs' }
  }
};
