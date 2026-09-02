import { DatePicker, DatePickerCalendar, DatePickerControl, Label } from '@godaddy/antares';

/**
 * A disabled picker via `isDisabled`.
 * @title Disabled
 * @order 7
 */
export function DisabledExample() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
      <DatePickerControl />
      <DatePickerCalendar />
    </DatePicker>
  );
}
