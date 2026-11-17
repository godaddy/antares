import { Button, Flex, Group, Input, Label, TextField } from '@godaddy/antares';

/** Control buttons work standalone, or as parts of a field that joins their corners. */
export function ControlExample() {
  return (
    <Flex direction="column" alignItems="start" gap="md">
      <Flex gap="sm" alignItems="center">
        <Button variant="control" size="sm">
          Small
        </Button>
        <Button variant="control">Standalone</Button>
        <Button variant="control" size="lg">
          Large
        </Button>
      </Flex>
      <TextField>
        <Label>Domain</Label>
        <Group>
          <Button slot="control">First</Button>
          <Input />
          <Button slot="control">Middle</Button>
          <Button slot="control">Last</Button>
        </Group>
      </TextField>
    </Flex>
  );
}
