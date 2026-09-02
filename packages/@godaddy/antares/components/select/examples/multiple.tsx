import { useState } from 'react';
import {
  Button,
  Content,
  Group,
  Icon,
  Label,
  ListBox,
  Popover,
  Select,
  SelectItem,
  SelectValue,
  Text,
  type SelectKey
} from '@godaddy/antares';

/**
 * Set `selectionMode="multiple"` to allow multiple values. `value` is an array of keys.
 * @order 3
 */
export function SelectMultipleExample() {
  const [value, setValue] = useState<readonly SelectKey[]>(['latte', 'mocha']);

  return (
    <>
      <Select placeholder="Pick one or more" selectionMode="multiple" value={value} onChange={setValue}>
        <Label>Coffees you like</Label>
        <Group alignItems="center">
          <Button variant="trigger">
            <SelectValue />
            <Icon icon="chevron-down" />
          </Button>
        </Group>
        <Popover hideArrow>
          <Content blockPadding="xs" inlinePadding="0">
            <ListBox>
              <SelectItem id="espresso">Espresso</SelectItem>
              <SelectItem id="latte">Latte</SelectItem>
              <SelectItem id="cappuccino">Cappuccino</SelectItem>
              <SelectItem id="americano">Americano</SelectItem>
              <SelectItem id="mocha">Mocha</SelectItem>
            </ListBox>
          </Content>
        </Popover>
      </Select>
      <Text>
        <strong>Selected:</strong> {value.length === 0 ? '(none)' : value.join(', ')}
      </Text>
    </>
  );
}
