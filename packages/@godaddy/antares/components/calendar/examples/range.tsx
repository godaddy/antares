import { RangeCalendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function RangeCalendarExample() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: parseDate('2024-03-10'), end: parseDate('2024-03-15') }}
    />
  );
}
