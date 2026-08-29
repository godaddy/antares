import { Group, Input, Label, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter text" />
      </Group>
    </TextField>
  );
}
