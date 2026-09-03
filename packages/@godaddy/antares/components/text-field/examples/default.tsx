import { Input, Label, TextField } from '@godaddy/antares';

/**
 * Minimal usage: a `Label` and an `Input`.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Input placeholder="Enter your name" />
    </TextField>
  );
}
