import { Group, Input, Label, Select, SelectItem, Text, TextField } from '@godaddy/antares';

/**
 * Amount input and currency Select sharing one Group. The Label names the input;
 * the nested Select needs its own `aria-label`.
 * @ignore
 */
export function InGroupExample() {
  return (
    <TextField>
      <Label>Price</Label>
      <Group>
        <Input placeholder="12,231.67" />
        <Select aria-label="Currency" defaultValue="usd">
          <SelectItem id="usd">USD</SelectItem>
          <SelectItem id="eur">EUR</SelectItem>
          <SelectItem id="gbp">GBP</SelectItem>
          <SelectItem id="brl">BRL</SelectItem>
        </Select>
      </Group>
      <Text slot="description">Enter an amount</Text>
    </TextField>
  );
}
