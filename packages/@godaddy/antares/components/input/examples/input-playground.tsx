import { Input, Label, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Input placeholder="Enter text" />
    </TextField>
  );
}
