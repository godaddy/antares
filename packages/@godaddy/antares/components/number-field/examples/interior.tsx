import { Button, Flex, Group, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Every part a NumberField styles: stepper faces the field fills, a stepper whose own props win
 * over them, and a plain `Button` the field leaves alone. The first field sits at its maximum, so
 * React Aria disables its increment button. The last field is disabled, so its control affix is
 * disabled with it while the plain `Button` beside it stays live.
 * @ignore
 */
export function InteriorExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField size="sm" defaultValue={0} maxValue={0}>
        <Label>Quantity</Label>
        <Group>
          <Button slot="decrement" />
          <Input />
          <Button slot="increment" />
        </Group>
      </NumberField>

      <NumberField size="sm">
        <Label>Servings</Label>
        <Group>
          <Button slot="decrement" variant="primary">
            less
          </Button>
          <Input />
        </Group>
        <Button>Reset</Button>
      </NumberField>

      <NumberField isDisabled>
        <Label>Guests</Label>
        <Group>
          <Input />
          <Button slot="control">Clear</Button>
        </Group>
        <Button>Help</Button>
      </NumberField>
    </Flex>
  );
}
