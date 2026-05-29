import { parseDate } from '@internationalized/date';
import { RangeCalendar } from '@godaddy/antares';

export function CalendarDefaultRangeExample() {
  return (
    <RangeCalendar
      aria-label="Booking range"
      defaultValue={{
        start: parseDate('2024-03-05'),
        end: parseDate('2024-03-12')
      }}
    />
  );
}
