import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarDisabledExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} isDisabled />;
}
