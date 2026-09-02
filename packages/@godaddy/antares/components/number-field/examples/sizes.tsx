import { Button, Flex, Group, Icon, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @order 8
 */
export function NumberFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField minValue={0} maxValue={100}>
        <Label>Quantity (md)</Label>
        <Group>
          <Button slot="decrement" variant="control">
            <Icon icon="minus" />
          </Button>
          <Input placeholder="0" />
          <Button slot="increment" variant="control">
            <Icon icon="plus" />
          </Button>
        </Group>
      </NumberField>
      <NumberField minValue={0} maxValue={100} size="sm">
        <Label>Quantity (sm)</Label>
        <Group>
          <Button slot="decrement" variant="control">
            <Icon icon="minus" />
          </Button>
          <Input placeholder="0" />
          <Button slot="increment" variant="control">
            <Icon icon="plus" />
          </Button>
        </Group>
      </NumberField>
    </Flex>
  );
}
