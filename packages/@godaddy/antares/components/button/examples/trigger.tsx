import { Button, Group, Label, TextField } from '@godaddy/antares';

/**
 * Use the trigger variant as a transparent field face.
 * @title Trigger
 */
export function TriggerExample() {
  return (
    <TextField>
      <Label>Choice</Label>
      <Group>
        <Button variant="trigger">Choose an option</Button>
      </Group>
    </TextField>
  );
}
