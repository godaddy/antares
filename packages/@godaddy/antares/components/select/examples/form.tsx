import { useState, type FormEvent } from 'react';
import {
  Box,
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
  SelectValue,
  Text
} from '@godaddy/antares';

/**
 * Set `name` to submit the value with a native `<form>`. Multiple-mode values submit as repeated entries with the same `name`.
 * @order 6
 */
export function SelectFormExample() {
  const [submitted, setSubmitted] = useState<Record<string, string | string[]> | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries: Record<string, string | string[]> = {};
    for (const [key, value] of data.entries()) {
      const stringValue = String(value);
      const existing = entries[key];
      if (existing === undefined) {
        entries[key] = stringValue;
      } else if (Array.isArray(existing)) {
        entries[key] = [...existing, stringValue];
      } else {
        entries[key] = [existing, stringValue];
      }
    }
    setSubmitted(entries);
  }

  return (
    <Flex as="form" direction="column" gap="md" onSubmit={handleSubmit}>
      <Select name="drink" placeholder="Pick a drink" isRequired>
        <Label>Drink</Label>
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
      <Select name="extras" placeholder="Pick any extras" selectionMode="multiple">
        <Label>Extras</Label>
        <Group alignItems="center">
          <Button variant="trigger">
            <SelectValue />
            <Icon icon="chevron-down" />
          </Button>
        </Group>
        <Popover hideArrow>
          <Content blockPadding="xs" inlinePadding="0">
            <ListBox>
              <SelectItem id="oat-milk">Oat milk</SelectItem>
              <SelectItem id="extra-shot">Extra shot</SelectItem>
              <SelectItem id="vanilla">Vanilla syrup</SelectItem>
            </ListBox>
          </Content>
        </Popover>
      </Select>
      <Flex gap="sm">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="minimal" onPress={() => setSubmitted(null)}>
          Reset
        </Button>
      </Flex>
      {submitted && (
        <Box padding="md" elevation="card" rounding="lg">
          <Text>
            <strong>Submitted:</strong> {JSON.stringify(submitted)}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
