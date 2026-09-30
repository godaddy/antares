import { useState } from 'react';
import { Button, Text } from '@godaddy/antares';
import { useOverlayContainer, type UseOverlayContainerOptions } from '#components/_internal/use-overlay-container';

interface DefaultExampleProps extends Pick<UseOverlayContainerOptions, 'overlay'> {
  /** Whether the example begins open. */
  defaultOpen?: boolean;
}

/**
 * Resize while open: the container changes only on the next opening.
 * @order 1
 */
export function DefaultExample({ defaultOpen = false, overlay }: DefaultExampleProps) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const container = useOverlayContainer({ isOpen, overlay });

  return (
    <>
      <Button onPress={() => setOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</Button>
      <Text role="status">{container}</Text>
    </>
  );
}
