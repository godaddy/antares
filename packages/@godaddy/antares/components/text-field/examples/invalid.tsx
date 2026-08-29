import { TextField } from '@godaddy/antares';

/**
 * Use `isInvalid` with `errorMessage` for validation feedback.
 * @order 3
 */
export function TextFieldInvalidExample() {
  return (
    <TextField
      label="Email"
      placeholder="you@example.com"
      errorMessage="Please enter a valid email address"
      isInvalid
      isRequired
    />
  );
}
