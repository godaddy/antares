import { FieldError, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Use `isInvalid` with `FieldError` for validation feedback.
 * @order 3
 */
export function TextFieldInvalidExample() {
  return (
    <TextField isInvalid isRequired>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}
