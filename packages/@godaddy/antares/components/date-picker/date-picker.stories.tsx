'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DatePicker, DateRangePicker } from '@godaddy/antares';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/date-picker-playground.tsx';
import { DatePickerDefaultExample } from './examples/default.tsx';
import { DatePickerControlledExample } from './examples/controlled.tsx';
import { DateRangePickerExample } from './examples/range.tsx';
import { DatePickerMinMaxExample } from './examples/min-max.tsx';
import { DatePickerWithErrorExample } from './examples/with-error.tsx';
import { DatePickerDisabledExample } from './examples/disabled.tsx';
import { DatePickerFormatOptionsExample } from './examples/format-options.tsx';

export default getMeta({ title: 'components/DatePicker' });

export const Props = getComponentDocs(DatePicker);
export const DateRangePickerProps = getComponentDocs(DateRangePicker);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};

export const Default = getStory(DatePickerDefaultExample);
export const Controlled = getStory(DatePickerControlledExample);
export const Range = getStory(DateRangePickerExample);
export const MinMax = getStory(DatePickerMinMaxExample);
export const WithError = getStory(DatePickerWithErrorExample);
export const Disabled = getStory(DatePickerDisabledExample);
export const FormatOptions = getStory(DatePickerFormatOptionsExample);
