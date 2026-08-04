import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * A calendar with a pre-selected date.
 * @title With value
 * @order 2
 */
export function CalendarWithValueExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />;
}
