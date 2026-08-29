import { ControlButton, Group, Input, Label, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Type..." />
        <ControlButton>Go</ControlButton>
      </Group>
    </TextField>
  );
}
