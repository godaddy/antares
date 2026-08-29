import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Label names a field. The required asterisk comes from Field CSS when the root is `isRequired`.
 * @order 9
 */
export function LabelExample() {
  return (
    <TextField isRequired>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}
