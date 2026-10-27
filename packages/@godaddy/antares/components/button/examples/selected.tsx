import { useState } from 'react';
import { Button, type ButtonProps } from '@godaddy/antares';

/** Use `isSelected` to show selection, and update it in `onPress`; the button does not toggle itself. */
export function SelectedExample({ isDisabled }: Pick<ButtonProps, 'isDisabled'> = {}) {
  const [isSelected, setSelected] = useState(true);

  return (
    <Button variant="control" isSelected={isSelected} isDisabled={isDisabled} onPress={() => setSelected(!isSelected)}>
      Available
    </Button>
  );
}
