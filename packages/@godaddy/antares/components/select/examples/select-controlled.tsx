import { useState } from 'react';
import { Box, Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectControlledExample() {
  const [selectedKey, setSelectedKey] = useState<string>('latte');

  return (
    <Flex direction="column" gap="md">
      <Select
        aria-label="Coffee drinks"
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(key as string)}
      >
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>

      <Box padding="md" elevation="card" rounding="lg">
        <strong>Selected:</strong> {selectedKey}
      </Box>
    </Flex>
  );
}
