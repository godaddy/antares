import { DatePicker, FieldError, Label } from '@godaddy/antares';

/**
 * An invalid picker showing a validation message via `isInvalid` and a `FieldError`.
 * @title With error
 * @order 6
 */
export function WithErrorExample() {
  return (
    <DatePicker isInvalid>
      <Label>Event date</Label>
      <FieldError>Please choose a date</FieldError>
    </DatePicker>
  );
}
