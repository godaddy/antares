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
 * Pass a function when the interior needs the Select state. It receives `isOpen`,
 * `isInvalid`, and the rest of the render props.
 * @title Composed with state
 * @order 9
 */
export function ComposedStateExample() {
  return (
    <Select placeholder="Pick a drink">
      {function renderInterior({ isOpen }) {
        return (
          <>
            <Label>Drink</Label>
            <Group alignItems="center">
              <ControlButton flex={1} gap="sm" variant="select">
                <SelectValue />
                <Icon icon="chevron-down" />
              </ControlButton>
            </Group>
            <Text slot="description">{isOpen ? 'Use the arrow keys to browse' : 'Choose your favorite drink'}</Text>
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
          </>
        );
      }}
    </Select>
  );
}
