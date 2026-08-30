import { Flex, Select, SelectItem } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @title Sizes
 * @order 7
 */
export function SelectSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select
        label="Coffee (md)"
        placeholder="Pick a drink"
        options={
          <>
            <SelectItem id="espresso">Espresso</SelectItem>
            <SelectItem id="latte">Latte</SelectItem>
            <SelectItem id="cappuccino">Cappuccino</SelectItem>
          </>
        }
      />
      <Select
        label="Coffee (sm)"
        placeholder="Pick a drink"
        size="sm"
        options={
          <>
            <SelectItem id="espresso">Espresso</SelectItem>
            <SelectItem id="latte">Latte</SelectItem>
            <SelectItem id="cappuccino">Cappuccino</SelectItem>
          </>
        }
      />
    </Flex>
  );
}
