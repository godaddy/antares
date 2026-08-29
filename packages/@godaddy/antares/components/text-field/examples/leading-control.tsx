import { ControlButton, Flex, Group, Label, Text, TextField, type GroupProps } from '@godaddy/antares';

/**
 * A group with a leading control before the fill.
 * @title Leading control
 * @order 8
 */
export function TextFieldLeadingControlExample(props: GroupProps) {
  return (
    <TextField isDisabled={props.isDisabled} isInvalid={props.isInvalid}>
      <Label>Phone</Label>
      <Group gap="sm" {...props}>
        <ControlButton aria-label="Country code">Click Me</ControlButton>
        <Flex as="span" flex={1} alignItems="center" padding="md">
          Placeholder content
        </Flex>
      </Group>
      <Text slot="description">Enter your phone number</Text>
    </TextField>
  );
}
