'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DateFieldBasicExample } from './examples/basic.tsx';
import { DateFieldControlledExample } from './examples/controlled.tsx';
import { DateFieldFormExample } from './examples/form.tsx';
import { DateFieldKeyboardInputExample } from './examples/keyboard-input.tsx';
import { DateFieldWithErrorExample } from './examples/with-error.tsx';
import { DateFieldWithMinMaxExample } from './examples/with-min-max.tsx';
import { DateFieldWithUnavailableDatesExample } from './examples/with-unavailable-dates.tsx';
import { DateField } from './src/index.tsx';

export default getMeta({
  title: 'components/DateField'
});

export const Props = getComponentDocs(DateField);

export const Basic = getStory(DateFieldBasicExample);

export const KeyboardInput = getStory(DateFieldKeyboardInputExample);

export const WithMinMax = getStory(DateFieldWithMinMaxExample);

export const WithUnavailableDates = getStory(DateFieldWithUnavailableDatesExample);

export const WithError = getStory(DateFieldWithErrorExample);

export const Controlled = getStory(DateFieldControlledExample);

export const Form = getStory(DateFieldFormExample);
