import { DateField } from '@godaddy/antares';

export function DateFieldWithErrorExample() {
  return <DateField label="Start date" errorMessage="Please select a valid date." isInvalid isRequired />;
}
