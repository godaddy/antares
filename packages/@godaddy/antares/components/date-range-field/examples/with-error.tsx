import { DateRangeField } from '@godaddy/antares';

export function DateRangeFieldWithErrorExample() {
  return <DateRangeField label="Trip dates" errorMessage="Please select a valid range." isInvalid isRequired />;
}
