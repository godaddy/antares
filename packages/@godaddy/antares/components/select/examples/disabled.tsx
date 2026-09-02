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
  SelectValue
} from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent interaction.
 * @order 5
 */
export function SelectDisabledExample() {
  return (
    <Select defaultValue="latte" isDisabled>
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
          </ListBox>
        </Content>
      </Popover>
    </Select>
  );
}
