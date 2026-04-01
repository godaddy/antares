import { TextField } from '@godaddy/antares';

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
