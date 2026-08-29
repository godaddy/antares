import { Group, Input, Label, Select, SelectItem, Text, TextField } from '@godaddy/antares';

/**
 * Amount input and currency Select sharing one Group. Select sees InGroupContext
 * and skips its own Field/Group wrapper.
 * @ignore
 */
export function FieldSelectCompositeExample() {
  return (
    <TextField>
      <Label id="price-label">Price</Label>
      <Group aria-labelledby="price-label">
        <Input aria-label="Amount" placeholder="12,231.67" />
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
