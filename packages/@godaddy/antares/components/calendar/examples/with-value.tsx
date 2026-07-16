import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function CalendarWithValueExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />;
}
