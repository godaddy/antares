import { ControlButton, Group, Input, Label, Text, TextField, type GroupProps } from '@godaddy/antares';

/**
 * Compose with `children` when you need a leading control instead of `leadingText`.
 * @title Leading control
 * @order 8
 */
export function LeadingControlExample(props: GroupProps) {
  return (
    <TextField isDisabled={props.isDisabled} isInvalid={props.isInvalid}>
      <Label>Phone</Label>
      <Group gap="sm" {...props}>
        <ControlButton aria-label="Country code">Click Me</ControlButton>
        <Input placeholder="Enter your phone number" />
      </Group>
      <Text slot="description">Enter your phone number</Text>
    </TextField>
  );
}
