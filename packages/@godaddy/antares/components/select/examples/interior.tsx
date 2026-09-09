import { Button, Flex, Group, Input, Label, Select, SelectItem, SelectOptions, TextField } from '@godaddy/antares';

/**
 * A Select as a field of its own, whose trigger takes the box chrome, beside one composed as a
 * control inside another field's `Group`, whose trigger takes the control chrome instead, beside a
 * disabled Select whose control affix is disabled with it.
 * @ignore
 */
export function InteriorExample() {
  return (
    <Flex direction="column" gap="md">
      <Select placeholder="Pick a drink">
        <Label>Coffee</Label>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
        </SelectOptions>
      </Select>

      <TextField>
        <Label>Phone number</Label>
        <Group>
          <Select aria-label="Country code" defaultValue="us" variant="control">
            <Button slot="trigger" />
            <SelectOptions>
              <SelectItem id="us">US +1</SelectItem>
            </SelectOptions>
          </Select>
          <Input placeholder="555-555-5555" />
        </Group>
      </TextField>

      <Select isDisabled placeholder="Pick a drink">
        <Label>Tea</Label>
        <Group>
          <Button slot="trigger" />
          <Button slot="control">Clear</Button>
        </Group>
        <SelectOptions>
          <SelectItem id="green">Green</SelectItem>
        </SelectOptions>
      </Select>
    </Flex>
  );
}
