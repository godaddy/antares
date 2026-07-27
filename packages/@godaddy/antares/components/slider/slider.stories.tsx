'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { SliderControlledExample } from './examples/controlled.tsx';
import { SliderDefaultExample } from './examples/default.tsx';
import { SliderDisabledExample } from './examples/disabled.tsx';
import { SliderLabelsExample } from './examples/labels.tsx';
import { SliderMarkersExample } from './examples/markers.tsx';
import { SliderPlaygroundExample, type SliderPlaygroundExampleProps } from './examples/slider-playground.tsx';
import { Slider } from './src/index.tsx';

export default getMeta({ title: 'components/Slider' });

export const Props = getComponentDocs(Slider);

export const Default = getStory(SliderDefaultExample);
export const Controlled = getStory(SliderControlledExample);
export const Disabled = getStory(SliderDisabledExample);
export const Labels = getStory(SliderLabelsExample);
export const Markers = getStory(SliderMarkersExample);

export const Playground = {
  render: (args: SliderPlaygroundExampleProps) => <SliderPlaygroundExample {...args} />,
  args: {
    label: 'Volume',
    description: '',
    value: undefined,
    defaultValue: 50,
    minValue: 0,
    maxValue: 100,
    step: 10,
    markers: false,
    valueLabel: undefined,
    minLabel: '',
    maxLabel: '',
    isDisabled: false
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label above the slider' },
    description: { control: 'text', description: 'Helper text below the slider' },
    value: { control: 'number', description: 'Current value for controlled usage; unset to use defaultValue' },
    defaultValue: { control: 'number', description: 'Initial value for uncontrolled usage' },
    minValue: { control: 'number', description: 'Minimum allowed value' },
    maxValue: { control: 'number', description: 'Maximum allowed value' },
    step: { control: 'number', description: 'Increment and snap interval' },
    markers: { control: 'boolean', description: 'Show a marker at each step position' },
    valueLabel: { control: 'text', description: 'Text displayed opposite the slider label' },
    minLabel: { control: 'text', description: 'Content displayed at the minimum end of the track' },
    maxLabel: { control: 'text', description: 'Content displayed at the maximum end of the track' },
    isDisabled: { control: 'boolean', description: 'Disable the slider' }
  }
};
