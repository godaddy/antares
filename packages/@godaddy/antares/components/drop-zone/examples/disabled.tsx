import { DropZone, Text } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DropZone isDisabled>
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
