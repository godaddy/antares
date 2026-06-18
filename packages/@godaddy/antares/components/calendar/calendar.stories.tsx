'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { CalendarDefaultExample } from './examples/default.tsx';
import { CalendarDefaultRangeExample } from './examples/default-range.tsx';
import { CalendarTodayDistinctExample } from './examples/today-distinct.tsx';
import { CalendarWithMinMaxExample } from './examples/with-min-max.tsx';
import { CalendarWithUnavailableDatesExample } from './examples/with-unavailable-dates.tsx';
import { Calendar, RangeCalendar } from './src/index.tsx';

export default getMeta({
  title: 'components/Calendar'
});

export const Props = getComponentDocs(Calendar);
export const RangeProps = getComponentDocs(RangeCalendar);

export const Default = getStory(CalendarDefaultExample);

export const DefaultRange = getStory(CalendarDefaultRangeExample);

export const WithMinMax = getStory(CalendarWithMinMaxExample);

export const WithUnavailableDates = getStory(CalendarWithUnavailableDatesExample);

export const TodayDistinct = getStory(CalendarTodayDistinctExample);
