import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function DatePickerMinMaxExample() {
  return <DatePicker label="Booking date" minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')} />;
}
