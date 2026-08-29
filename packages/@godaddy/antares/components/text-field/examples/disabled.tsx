import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent input.
 * @order 4
 */
export function TextFieldDisabledExample() {
  return (
    <TextField defaultValue="Disabled value" isDisabled>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter your name" />
      </Group>
    </TextField>
  );
}
