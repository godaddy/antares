import {
  Button,
  Content,
  FieldError,
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
 * Use `isInvalid` with a `FieldError` for validation feedback.
 * @order 4
 */
export function SelectInvalidExample() {
  return (
    <Select placeholder="Pick a drink" isInvalid isRequired>
      <Label>Coffee</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
      <FieldError>Please choose a drink</FieldError>
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
