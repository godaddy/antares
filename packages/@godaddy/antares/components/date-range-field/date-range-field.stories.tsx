'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DateRangeFieldBasicExample } from './examples/basic.tsx';
import { DateRangeFieldControlledExample } from './examples/controlled.tsx';
import { DateRangeFieldFormExample } from './examples/form.tsx';
import { DateRangeFieldKeyboardInputExample } from './examples/keyboard-input.tsx';
import { DateRangeFieldWithErrorExample } from './examples/with-error.tsx';
import { DateRangeFieldWithMinMaxExample } from './examples/with-min-max.tsx';
import { DateRangeFieldWithUnavailableDatesExample } from './examples/with-unavailable-dates.tsx';
import { DateRangeField } from './src/index.tsx';

export default getMeta({
  title: 'components/DateRangeField'
});

export const Props = getComponentDocs(DateRangeField);

export const Basic = getStory(DateRangeFieldBasicExample);

export const KeyboardInput = getStory(DateRangeFieldKeyboardInputExample);

export const WithMinMax = getStory(DateRangeFieldWithMinMaxExample);

export const WithUnavailableDates = getStory(DateRangeFieldWithUnavailableDatesExample);

export const WithError = getStory(DateRangeFieldWithErrorExample);

export const Controlled = getStory(DateRangeFieldControlledExample);

export const Form = getStory(DateRangeFieldFormExample);
