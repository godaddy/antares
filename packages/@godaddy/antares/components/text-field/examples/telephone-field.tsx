import { Group, Input, Label, Select, SelectItem, Text, TextField } from '@godaddy/antares';

/**
 * Compose a telephone number input paired with a country-code select.
 *
 * @order 11
 */
export function TelephoneFieldExample() {
  return (
    <TextField>
      <Label>Phone number</Label>
      <Group>
        <Select aria-label="Country code" defaultValue="us" variant="control">
          <SelectItem id="us">US +1</SelectItem>
          <SelectItem id="mx">MX +52</SelectItem>
          <SelectItem id="gb">GB +44</SelectItem>
        </Select>
        <Input autoComplete="tel-national" inputMode="tel" placeholder="555-555-5555" type="tel" />
      </Group>
      <Text slot="description">We'll only call about your order.</Text>
    </TextField>
  );
}
