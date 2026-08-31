import { DatePicker } from '@godaddy/antares';

/**
 * An invalid picker showing a validation message via `isInvalid` and `errorMessage`.
 * @order 6
 */
export function WithErrorExample() {
  return <DatePicker label="Event date" isInvalid errorMessage="Please choose a date" />;
}
