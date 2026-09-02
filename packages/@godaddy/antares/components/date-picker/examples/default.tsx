import { DatePicker, DatePickerCalendar, DatePickerControl, Label } from '@godaddy/antares';

/**
 * A single date picker with a `Label`.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <DatePickerControl />
      <DatePickerCalendar />
    </DatePicker>
  );
}
