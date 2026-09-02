import {
  Button,
  Content,
  Group,
  Icon,
  Input,
  Label,
  ListBox,
  Popover,
  Select,
  SelectItem,
  SelectValue,
  Text,
  TextField
} from '@godaddy/antares';

/**
 * Compose a telephone number input paired with a country-code select.
 *
 * @order 9
 */
export function TelephoneFieldExample() {
  return (
    <TextField autoComplete="tel-national" inputMode="tel" type="tel">
      <Label>Phone number</Label>
      <Group>
        <Select aria-label="Country code" defaultValue="us" variant="control">
          <Button variant="control">
            <SelectValue />
            <Icon icon="chevron-down" />
          </Button>
          <Popover hideArrow>
            <Content blockPadding="xs" inlinePadding="0">
              <ListBox>
                <SelectItem id="us">US +1</SelectItem>
                <SelectItem id="mx">MX +52</SelectItem>
                <SelectItem id="gb">GB +44</SelectItem>
              </ListBox>
            </Content>
          </Popover>
        </Select>
        <Input placeholder="555-555-5555" />
      </Group>
      <Text slot="description">We'll only call about your order.</Text>
    </TextField>
  );
}
