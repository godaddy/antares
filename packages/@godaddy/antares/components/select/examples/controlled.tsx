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
 * Use `value` and `onChange` for controlled state.
 * @order 2
 */
export function SelectControlledExample() {
  const [value, setValue] = useState<SelectKey | null>('latte');

  return (
    <>
      <Select placeholder="Pick a drink" value={value} onChange={setValue}>
        <Label>Coffee</Label>
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
        <strong>Value:</strong> {String(value ?? '(none)')}
      </Text>
    </>
  );
}
