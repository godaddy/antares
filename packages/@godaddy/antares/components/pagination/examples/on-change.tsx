import { Flex, Pagination } from '@godaddy/antares';
import { useState } from 'react';

/**
 * The `onChange` callback fires with the new page index whenever the user navigates.
 * @title onChange Event
 * @order 5
 */
export function OnChangeExample() {
  const [onChangeValue, setOnChangeValue] = useState<number | undefined>(undefined);

  return (
    <Flex direction="column" gap="sm">
      <Pagination total={3} onChange={setOnChangeValue} />
      <Flex as="span" justifyContent="center">
        onChange: {onChangeValue ?? 'none'}
      </Flex>
    </Flex>
  );
}
