'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Calendar, RangeCalendar } from '@godaddy/antares';
import { PlaygroundExample } from './examples/calendar-playground.tsx';

export default getMeta({ title: 'components/Calendar' });

export const Props = getComponentDocs(Calendar);
export const RangeCalendarProps = getComponentDocs(RangeCalendar);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: { isDisabled: false, isReadOnly: false, pageCount: 1 },
  argTypes: {
    isDisabled: { control: 'boolean', description: 'Disables the calendar.' },
    isReadOnly: { control: 'boolean', description: 'Makes the calendar read-only.' },
    pageCount: {
      control: 'radio',
      options: [1, 2, 3],
      description: 'Number of month grids to display (maps to visibleDuration).'
    }
  }
});
