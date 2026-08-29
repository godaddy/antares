import { ControlButton, Flex, Group, Icon, Input, Label, Text, TextField, type GroupProps } from '@godaddy/antares';

/**
 * Compose with `children` for a leading icon and trailing action; `leadingText` and `trailingText` are for fixed text only.
 * @title Icon accessories
 * @order 10
 */
export function IconAccessoriesExample(props: GroupProps) {
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
