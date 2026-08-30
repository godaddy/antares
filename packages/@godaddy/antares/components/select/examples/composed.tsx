import {
  Content,
  ControlButton,
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
 * Compose the Select interior when the default field layout is not enough.
 * @order 2
 */
export function ComposedExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Drink</Label>
      <Group alignItems="center">
        <ControlButton flex={1} gap="sm" variant="select">
          <SelectValue />
          <Icon icon="chevron-down" />
        </ControlButton>
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
