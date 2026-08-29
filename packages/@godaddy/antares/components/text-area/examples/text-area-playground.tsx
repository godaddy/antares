import { Group, Label, TextArea, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField>
      <Label>Notes</Label>
      <Group>
        <TextArea placeholder="Type here" />
      </Group>
    </TextField>
  );
}
