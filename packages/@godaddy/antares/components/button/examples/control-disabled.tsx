import { Button, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * A control button can be disabled on its own inside an enabled field.
 * @ignore
 */
export function ControlDisabledExample() {
  return (
    <TextField>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Search" />
        <Button variant="control" isDisabled>
          Go
        </Button>
      </Group>
    </TextField>
  );
}
