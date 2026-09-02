import { FieldError, Input, Label, TextField } from '@godaddy/antares';

/**
 * Use `isInvalid` with a `FieldError` for validation feedback.
 * @order 3
 */
export function InvalidExample() {
  return (
    <TextField isInvalid isRequired>
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}
