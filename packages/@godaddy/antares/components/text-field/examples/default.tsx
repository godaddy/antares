import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Minimal usage: a `Label`, and an `Input` inside a `Group`.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter your name" />
      </Group>
    </TextField>
  );
}
