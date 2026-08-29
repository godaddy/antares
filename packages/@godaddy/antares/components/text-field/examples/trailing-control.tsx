import { ControlButton, Group, Input, Label, Text, TextField, type GroupProps } from '@godaddy/antares';

/**
 * Compose with `children` when you need a trailing control instead of `trailingText`.
 * @title Trailing control
 * @order 9
 */
export function TrailingControlExample(props: GroupProps) {
  return (
    <TextField isDisabled={props.isDisabled} isInvalid={props.isInvalid}>
      <Label>Search</Label>
      <Group gap="sm" {...props}>
        <Input placeholder="Type..." />
        <ControlButton aria-label="Search">Search</ControlButton>
      </Group>
      <Text slot="description">Search by keyword</Text>
    </TextField>
  );
}
