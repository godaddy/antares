import { FieldError, Group, Input, Label, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField isInvalid>
      <Label>Email</Label>
      <Group>
        <Input />
      </Group>
      <FieldError>This field is invalid</FieldError>
    </TextField>
  );
}
