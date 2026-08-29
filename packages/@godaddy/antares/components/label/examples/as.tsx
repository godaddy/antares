import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Setting the `as` prop changes the HTML tag. The default is `label`.
 * @order 2
 */
export function AsExample() {
  return (
    <TextField>
      <Label as="span">Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}
