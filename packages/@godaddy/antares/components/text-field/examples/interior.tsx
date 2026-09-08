import { Button, Flex, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Every part a TextField styles, enabled and disabled: the label, a composed `Group`, the input
 * inside it, an interactive affix that takes the control chrome, and a plain `Button` the field
 * leaves alone - it keeps the Button defaults even when the field is disabled.
 * @ignore
 */
export function InteriorExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Image</Label>
        <Group>
          <Button slot="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
        <Button>Reset</Button>
      </TextField>

      <TextField isDisabled>
        <Label>Image</Label>
        <Group>
          <Button slot="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
        <Button>Reset</Button>
      </TextField>
    </Flex>
  );
}
