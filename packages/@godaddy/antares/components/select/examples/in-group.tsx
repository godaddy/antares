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
 * Amount input and currency Select sharing one Group. The Label names the input;
 * the nested Select needs its own `aria-label`. `variant="control"` renders no
 * Field shell of its own, so it shares the host field's Group.
 * @ignore
 */
export function InGroupExample() {
  return (
    <TextField>
      <Label>Price</Label>
      <Group>
        <Input placeholder="12,231.67" />
        <Select aria-label="Currency" defaultValue="usd" variant="control">
          <Button variant="control">
            <SelectValue />
            <Icon icon="chevron-down" />
          </Button>
          <Popover hideArrow>
            <Content blockPadding="xs" inlinePadding="0">
              <ListBox>
                <SelectItem id="usd">USD</SelectItem>
                <SelectItem id="eur">EUR</SelectItem>
                <SelectItem id="gbp">GBP</SelectItem>
                <SelectItem id="brl">BRL</SelectItem>
              </ListBox>
            </Content>
          </Popover>
        </Select>
      </Group>
      <Text slot="description">Enter an amount</Text>
    </TextField>
  );
}
