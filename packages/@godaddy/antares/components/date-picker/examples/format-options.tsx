import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Controlling the label with `formatOptions`.
 * @order 4
 */
export function FormatOptionsExample() {
  return (
    <DatePicker label="Event date" defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }} />
  );
}
