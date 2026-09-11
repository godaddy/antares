'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import {
  DatePicker,
  DateRangePicker,
  DatePickerCalendar,
  DateRangePickerCalendar,
  DatePickerValue,
  DateRangePickerValue
} from '@godaddy/antares';
import { PlaygroundExample } from './examples/date-picker-playground.tsx';

export default getMeta({ title: 'components/DatePicker' });

export const Props = getComponentDocs(DatePicker);

export const DateRangePickerProps = getComponentDocs(DateRangePicker);

export const DatePickerCalendarProps = getComponentDocs(DatePickerCalendar);

export const DateRangePickerCalendarProps = getComponentDocs(DateRangePickerCalendar);

export const DatePickerValueProps = getComponentDocs(DatePickerValue);

export const DateRangePickerValueProps = getComponentDocs(DateRangePickerValue);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    label: 'Event date',
    placeholder: 'Select a date',
    isDisabled: false,
    isRequired: false,
    isInvalid: false
  },
  argTypes: {
    label: { control: 'text', description: 'Label shown above the field.' },
    description: { control: 'text', description: 'Helper text shown below the field.' },
    placeholder: { control: 'text', description: 'Trigger text when no date is selected.' },
    isDisabled: { control: 'boolean', description: 'Disables the field.' },
    isRequired: { control: 'boolean', description: 'Marks the field required.' },
    isInvalid: { control: 'boolean', description: 'Forces the invalid state.' },
    errorMessage: { control: 'text', description: 'Error text shown when invalid.' }
  }
});
