import { useState } from 'react';
import { Button, Flex } from '@godaddy/antares';

/** Use `isSelected` to show selection, and update it in `onPress`; the button does not toggle itself. */
export function SelectedExample() {
  const [isSelected, setSelected] = useState(true);

  return (
    <Flex alignItems="center" gap="sm" wrap="wrap">
      <Button variant="control" isSelected={isSelected} onPress={() => setSelected(!isSelected)}>
        Available
      </Button>
      <Button variant="secondary" isSelected isDisabled>
        Disabled on
      </Button>
      <Button variant="secondary" isDisabled>
        Disabled off
      </Button>
      <Button variant="inline" isSelected>
        Inline
      </Button>
    </Flex>
  );
}
