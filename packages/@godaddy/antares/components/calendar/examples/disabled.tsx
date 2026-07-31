import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

/**
 * A fully disabled calendar.
 * @title Disabled
 * @order 6
 */
export function CalendarDisabledExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} isDisabled />;
}
