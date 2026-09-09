import { FieldError, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * FieldError renders when the field is invalid.
 * @order 1
 */
export function DefaultExample() {
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
