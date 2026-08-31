import { Button, Group, Input, Label, TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Use the control variant for an action that sits beside an input.
 * @title Control
 */
export function ControlExample({ isDisabled }: Pick<TextFieldProps, 'isDisabled'> = {}) {
  return (
    <TextField isDisabled={isDisabled}>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Search" />
        <Button variant="control">Go</Button>
      </Group>
    </TextField>
  );
}
