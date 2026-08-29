import { Flex, TextField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @title Sizes
 * @order 7
 */
export function TextFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField label="Email (md)" placeholder="you@example.com" />
      <TextField label="Email (sm)" placeholder="you@example.com" size="sm" />
    </Flex>
  );
}
