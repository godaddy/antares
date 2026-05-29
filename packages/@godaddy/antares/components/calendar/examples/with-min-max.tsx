import { parseDate } from '@internationalized/date';
import { Calendar } from '@godaddy/antares';

export function CalendarWithMinMaxExample() {
  return (
    <Calendar
      aria-label="Q1 2024"
      defaultValue={parseDate('2024-02-15')}
      minValue={parseDate('2024-01-01')}
      maxValue={parseDate('2024-03-31')}
    />
  );
}
