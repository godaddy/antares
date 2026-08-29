import { ControlButton, Flex, Group, Icon, Input, Label, Text, TextField, type GroupProps } from '@godaddy/antares';

/**
 * Leading icon and trailing action inside the group.
 * @title Icon accessories
 * @order 10
 */
export function TextFieldIconAccessoriesExample(props: GroupProps) {
  return (
    <TextField isDisabled={props.isDisabled} isInvalid={props.isInvalid}>
      <Label>Email</Label>
      <Group {...props}>
        <Flex as="span" alignItems="center" inlinePaddingStart="sm">
          <Icon icon="star" />
        </Flex>
        <Input placeholder="Email" />
        <ControlButton aria-label="Verify email address">Verify</ControlButton>
      </Group>
      <Text slot="description">Enter your email address</Text>
    </TextField>
  );
}
