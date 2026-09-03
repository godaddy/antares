import { Button, Flex, Group, Icon, Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Put a control or an icon beside the input. A `Button slot="control"` is an
 * interactive affix; static content is wrapped in a `Flex as="span"` to center it and give it a gutter.
 * @title Controls and icons
 * @order 8
 */
export function ControlsExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Image</Label>
        <Group>
          <Button slot="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
      </TextField>

      <TextField>
        <Label>Email</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
            Verify
          </Button>
        </Group>
        <Text slot="description">Enter your email address</Text>
      </TextField>
    </Flex>
  );
}
