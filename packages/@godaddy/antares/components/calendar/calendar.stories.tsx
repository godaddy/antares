'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { CalendarDefaultExample } from './examples/default.tsx';
import { CalendarDefaultRangeExample } from './examples/default-range.tsx';
import { CalendarOutOfMonthDaysExample } from './examples/out-of-month-days.tsx';
import { CalendarTodayDistinctExample } from './examples/today-distinct.tsx';
import { CalendarWithDurationExample } from './examples/with-duration.tsx';
import { CalendarWithIndicatorsExample } from './examples/with-indicators.tsx';
import { CalendarWithMinMaxExample } from './examples/with-min-max.tsx';
import { CalendarWithUnavailableDatesExample } from './examples/with-unavailable-dates.tsx';
import { Calendar } from './src/calendar.tsx';
import { RangeCalendar } from './src/range-calendar.tsx';

export default getMeta({
  title: 'components/Calendar'
});

export const Props = getComponentDocs(Calendar);
export const RangeProps = getComponentDocs(RangeCalendar);

export const Default = getStory(CalendarDefaultExample);

export const DefaultRange = getStory(CalendarDefaultRangeExample);

export const WithMinMax = getStory(CalendarWithMinMaxExample);

export const WithUnavailableDates = getStory(CalendarWithUnavailableDatesExample);

export const WithIndicators = getStory(CalendarWithIndicatorsExample);

export const TodayDistinct = getStory(CalendarTodayDistinctExample);

export const OutOfMonthDays = getStory(CalendarOutOfMonthDaysExample);

export const WithDuration = getStory(CalendarWithDurationExample);
