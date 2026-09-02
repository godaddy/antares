import { DatePicker, DatePickerCalendar, DatePickerControl, FieldError, Label } from '@godaddy/antares';

/**
 * An invalid picker showing a validation message via `isInvalid` and a `FieldError`.
 * @title With error
 * @order 6
 */
export function WithErrorExample() {
  return (
    <DatePicker isInvalid>
      <Label>Event date</Label>
      <DatePickerControl />
      <FieldError>Please choose a date</FieldError>
      <DatePickerCalendar />
    </DatePicker>
  );
}
