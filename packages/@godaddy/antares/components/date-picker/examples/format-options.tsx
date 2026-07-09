import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function DatePickerFormatOptionsExample() {
  return (
    <DatePicker label="Event date" defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }} />
  );
}
