import { Button, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Use the control variant for an action that sits beside an input.
 * @title Control
 */
export function ControlExample() {
  return (
    <TextField>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Search" />
        <Button variant="control">Go</Button>
      </Group>
    </TextField>
  );
}
