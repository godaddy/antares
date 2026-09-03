import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Group is the bordered field box. Size and invalid/disabled chrome apply here.
 * @order 2
 */
export function GroupExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter your name" />
      </Group>
    </TextField>
  );
}
