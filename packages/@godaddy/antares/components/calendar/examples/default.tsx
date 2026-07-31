import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * A single-date calendar.
 * @title Basic
 * @order 1
 */
export function CalendarDefaultExample() {
  return <Calendar aria-label="Event date" defaultFocusedValue={parseDate('2024-03-01')} />;
}
