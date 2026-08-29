import { ControlButton, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * ControlButton is an in-group action (steppers, search, select trigger).
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Type..." />
        <ControlButton aria-label="Search">Search</ControlButton>
      </Group>
    </TextField>
  );
}
