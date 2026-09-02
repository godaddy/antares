import {
  Button,
  Content,
  Flex,
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
 * Compare the supported `md` and `sm` visual sizes.
 * @title Sizes
 * @order 7
 */
export function SelectSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select placeholder="Pick a drink">
        <Label>Coffee (md)</Label>
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
      <Select placeholder="Pick a drink" size="sm">
        <Label>Coffee (sm)</Label>
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
    </Flex>
  );
}
