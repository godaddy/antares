'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DateFieldBasicExample } from './examples/basic.tsx';
import { DateFieldControlledExample } from './examples/controlled.tsx';
import { DateFieldDisabledRequiredReadOnlyExample } from './examples/disabled-required-readonly.tsx';
import { DateFieldFormExample } from './examples/form.tsx';
import { DateFieldMinMaxExample } from './examples/min-max.tsx';
import {
  DateFieldPlaygroundExample,
  type DateFieldPlaygroundExampleProps
} from './examples/date-field-playground.tsx';
import { DateFieldWithDefaultValueExample } from './examples/with-default-value.tsx';
import { DateFieldWithDescriptionExample } from './examples/with-description.tsx';
import { DateFieldWithErrorExample } from './examples/with-error.tsx';
import { DateFieldWithI18nExample } from './examples/with-i18n.tsx';
import { DateField } from './src/index.tsx';

export default getMeta({
  title: 'components/DateField'
});

export const Props = getComponentDocs(DateField);

export const Default = getStory(DateFieldBasicExample);

export const WithDefaultValue = getStory(DateFieldWithDefaultValueExample);

export const Controlled = getStory(DateFieldControlledExample);

export const WithDescription = getStory(DateFieldWithDescriptionExample);

export const WithError = getStory(DateFieldWithErrorExample);

export const MinMax = getStory(DateFieldMinMaxExample);

export const DisabledRequiredReadOnly = getStory(DateFieldDisabledRequiredReadOnlyExample);

export const Form = getStory(DateFieldFormExample);

export const WithI18n = getStory(DateFieldWithI18nExample);

export const Playground = {
  render: (args: DateFieldPlaygroundExampleProps) => <DateFieldPlaygroundExample {...args} />,
  args: {
    label: 'Start date',
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
    isRequired: false
  },
  argTypes: {
    label: { control: 'text', description: 'Label text shown above the frame' },
    description: { control: 'text', description: 'Helper text shown below the frame' },
    errorMessage: { control: 'text', description: 'Error message when invalid' },
    isDisabled: { control: 'boolean', description: 'Disable the input' },
    isInvalid: { control: 'boolean', description: 'Show invalid state' },
    isReadOnly: { control: 'boolean', description: 'Make the input read-only' },
    isRequired: { control: 'boolean', description: 'Mark as required' }
  }
};
