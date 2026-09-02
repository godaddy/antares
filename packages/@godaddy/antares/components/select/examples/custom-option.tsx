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
  type SelectItemProps
} from '@godaddy/antares';

function CountryOption(props: SelectItemProps) {
  return <SelectItem {...props} />;
}

/**
 * Option components may wrap SelectItem and still render inside Select's ListBox.
 * @title Custom option
 * @order 9
 */
export function CustomOptionExample() {
  return (
    <Select placeholder="Pick a country">
      <Label>Country</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <SelectValue />
          <Icon icon="chevron-down" />
        </Button>
      </Group>
      <Popover hideArrow>
        <Content blockPadding="xs" inlinePadding="0">
          <ListBox>
            <CountryOption id="us">United States</CountryOption>
            <CountryOption id="mx">Mexico</CountryOption>
            <CountryOption id="gb">United Kingdom</CountryOption>
          </ListBox>
        </Content>
      </Popover>
    </Select>
  );
}
