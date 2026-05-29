import { parseDate } from '@internationalized/date';
import { Calendar } from '@godaddy/antares';

export function CalendarDefaultExample() {
  return <Calendar aria-label="Date" defaultValue={parseDate('2024-03-15')} />;
}
