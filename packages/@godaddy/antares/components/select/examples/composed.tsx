import {
  Content,
  Button,
  FieldError,
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
 * Build the interior from lower-level pieces instead of `SelectControl` / `SelectOptions`,
 * for full control over the trigger and popover.
 * @title Composed
 * @order 8
 */
export function ComposedExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Drink</Label>
      <Group alignItems="center">
        <Button slot="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
      <Text slot="description">Choose your favorite drink</Text>
      <FieldError />
      <Popover hideArrow>
        <Content blockPadding="xs" inlinePadding="0">
          <ListBox>
            <SelectItem id="espresso">Espresso</SelectItem>
            <SelectItem id="latte">Latte</SelectItem>
            <SelectItem id="tea">Tea</SelectItem>
          </ListBox>
        </Content>
      </Popover>
    </Select>
  );
}
