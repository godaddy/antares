import { DropZone, isFileDropItem, Text } from '@godaddy/antares';

/**
 * A minimal drop zone. The `onDrop` callback receives the dropped items; use the exported `isFileDropItem` guard to narrow them to files. Wrap the instructional text in `<Text slot="label">` so it labels the visually hidden drop button for screen readers.
 * @order 1
 */
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
