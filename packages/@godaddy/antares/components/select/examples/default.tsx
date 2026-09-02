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
  Text
} from '@godaddy/antares';

/**
 * Minimal usage with a `Label` and a placeholder.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Coffee</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
      <Text slot="description">Select your favorite coffee</Text>
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
  );
}
