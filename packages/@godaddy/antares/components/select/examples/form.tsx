import { useState, type FormEvent } from 'react';
import { Box, Button, Flex, Select, SelectItem, Text } from '@godaddy/antares';

export function SelectFormExample() {
  const [submitted, setSubmitted] = useState<Record<string, string | string[]> | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries: Record<string, string | string[]> = {};
    data.forEach((value, key) => {
      const stringValue = String(value);
      const existing = entries[key];
      if (existing === undefined) {
        entries[key] = stringValue;
      } else if (Array.isArray(existing)) {
        entries[key] = [...existing, stringValue];
      } else {
        entries[key] = [existing, stringValue];
      }
    });
    setSubmitted(entries);
  }

  return (
    <Flex as="form" direction="column" gap="md" onSubmit={handleSubmit}>
      <Select name="drink" label="Drink" placeholder="Pick a drink" isRequired>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select name="extras" label="Extras" placeholder="Pick any extras" selectionMode="multiple">
        <SelectItem id="oat-milk">Oat milk</SelectItem>
        <SelectItem id="extra-shot">Extra shot</SelectItem>
        <SelectItem id="vanilla">Vanilla syrup</SelectItem>
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
