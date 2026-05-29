import { parseDate } from '@internationalized/date';
import { RangeCalendar } from '@godaddy/antares';

export function CalendarWithDurationExample() {
  return (
    <RangeCalendar
      aria-label="3 to 7 day stay"
      defaultFocusedValue={parseDate('2024-03-15')}
      minDuration={{ days: 3 }}
      maxDuration={{ days: 7 }}
    />
  );
}
