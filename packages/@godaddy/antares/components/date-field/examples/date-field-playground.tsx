import { DateField } from '@godaddy/antares';

export interface DateFieldPlaygroundExampleProps {
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  label?: string;
}

export function DateFieldPlaygroundExample({
  description,
  errorMessage,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  label
}: DateFieldPlaygroundExampleProps) {
  return (
    <DateField
      description={description}
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      label={label}
    />
  );
}
