import { Group, Input, Label, TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Compose Label, Group, and Input inside TextField.
 * @order 1
 */
export function DefaultExample(props: TextFieldProps) {
  return (
    <TextField {...props}>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter your name" />
      </Group>
    </TextField>
  );
}
