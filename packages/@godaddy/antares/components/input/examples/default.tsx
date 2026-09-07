import { Input, Label, TextField } from '@godaddy/antares';

/**
 * Input inside TextField. The field styles it.
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
