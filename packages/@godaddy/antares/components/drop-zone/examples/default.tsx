import { DropZone, isFileDropItem, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    >
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
