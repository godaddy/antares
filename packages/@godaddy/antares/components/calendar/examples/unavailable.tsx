import { Calendar } from '@godaddy/antares';
import { isWeekend, parseDate } from '@godaddy/antares/date';

export function CalendarUnavailableExample() {
  return (
    <Calendar
      aria-label="Weekday only"
      defaultValue={parseDate('2024-03-15')}
      isDateUnavailable={(date) => isWeekend(date, 'en-US')}
    />
  );
}
