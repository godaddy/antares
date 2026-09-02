import { useState } from 'react';
import { Button, Group, Icon, Input, Label, NumberField, Text } from '@godaddy/antares';

/**
 * Use `value` and `onChange` for controlled state.
 * @order 2
 */
export function NumberFieldControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField minValue={0} maxValue={100} value={value} onChange={setValue}>
        <Label>Quantity</Label>
        <Group>
          <Button slot="decrement" variant="control">
            <Icon icon="minus" />
          </Button>
          <Input />
          <Button slot="increment" variant="control">
            <Icon icon="plus" />
          </Button>
        </Group>
      </NumberField>
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}
