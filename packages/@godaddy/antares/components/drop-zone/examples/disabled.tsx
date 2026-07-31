import { DropZone, Text } from '@godaddy/antares';

/**
 * Set `isDisabled` to prevent the drop zone from accepting interactions. The zone is dimmed and the cursor indicates it is not interactive.
 * @order 2
 */
export function DisabledExample() {
  return (
    <DropZone isDisabled>
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
