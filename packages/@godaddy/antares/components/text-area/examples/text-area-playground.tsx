import { Label, TextArea, TextField } from '@godaddy/antares';

export function PlaygroundExample() {
  return (
    <TextField>
      <Label>Notes</Label>
      <TextArea placeholder="Type here" />
    </TextField>
  );
}
