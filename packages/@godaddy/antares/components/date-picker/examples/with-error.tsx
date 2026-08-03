import { DatePicker } from '@godaddy/antares';

/**
 * An invalid picker showing a validation message via `isInvalid` and `errorMessage`.
 * @title Error
 * @order 6
 */
export function DatePickerWithErrorExample() {
  return <DatePicker label="Event date" isInvalid errorMessage="Please choose a date" />;
}
