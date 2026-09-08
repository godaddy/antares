import { Button, Flex, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Every part a TextField styles, enabled and disabled: the label, a composed `Group`, the input
 * inside it, and an interactive affix that takes the control chrome.
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
      </TextField>

      <TextField isDisabled>
        <Label>Image</Label>
        <Group>
          <Button slot="control">Browse</Button>
          <Input placeholder="Paste an image URL" />
        </Group>
      </TextField>
    </Flex>
  );
}
