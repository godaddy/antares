'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Calendar } from '@godaddy/antares';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/calendar-playground.tsx';
import { CalendarBasicExample } from './examples/basic.tsx';
import { CalendarWithValueExample } from './examples/with-value.tsx';
import { RangeCalendarExample } from './examples/range.tsx';
import { CalendarMinMaxExample } from './examples/min-max.tsx';
import { CalendarUnavailableExample } from './examples/unavailable.tsx';
import { CalendarDisabledExample } from './examples/disabled.tsx';

export default getMeta({ title: 'components/Calendar' });

export const Props = getComponentDocs(Calendar);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};

export const Basic = getStory(CalendarBasicExample);
export const WithValue = getStory(CalendarWithValueExample);
export const Range = getStory(RangeCalendarExample);
export const MinMax = getStory(CalendarMinMaxExample);
export const Unavailable = getStory(CalendarUnavailableExample);
export const Disabled = getStory(CalendarDisabledExample);
