import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Label,
  Select,
  SelectItem,
  SelectOptions,
  SizeProvider,
  Text,
  TextField
} from '@godaddy/antares';

/**
 * Wrap a whole form to size it at once. Fields, their labels and descriptions, choices, and
 * buttons all follow the scope, so they stay aligned with each other.
 * @order 3
 */
export function FormExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <Heading level={2}>Contact details</Heading>

        <TextField>
          <Label>Full name</Label>
          <Input />
        </TextField>

        <TextField>
          <Label>Email</Label>
          <Input type="email" />
          <Text slot="description">We'll send receipts here.</Text>
        </TextField>

        <Select placeholder="Pick a country">
          <Label>Country</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="us">United States</SelectItem>
            <SelectItem id="ca">Canada</SelectItem>
            <SelectItem id="mx">Mexico</SelectItem>
          </SelectOptions>
        </Select>

        <Checkbox>Email me about offers</Checkbox>

        <Flex gap="sm">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Flex>
      </Flex>
    </SizeProvider>
  );
}
