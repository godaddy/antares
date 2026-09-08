import { Input, Label, TextField } from '@godaddy/antares';

/**
 * Input inside TextField.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
    </TextField>
  );
}
