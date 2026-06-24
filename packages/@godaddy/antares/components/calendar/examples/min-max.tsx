import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarMinMaxExample() {
  return (
    <Calendar
      aria-label="Booking date"
      defaultValue={parseDate('2024-03-15')}
      minValue={parseDate('2024-03-05')}
      maxValue={parseDate('2024-03-25')}
    />
  );
}
