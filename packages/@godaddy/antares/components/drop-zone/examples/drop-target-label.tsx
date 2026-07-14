import { DropZone, type DropZoneRenderProps, isFileDropItem, Text } from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

export function DropTargetLabelExample() {
  return (
    <DropZone
      getDropOperation={function getDropOperation(types) {
        return ACCEPTED_TYPES.some(function matches(type) {
          return types.has(type);
        })
          ? 'copy'
          : 'cancel';
      }}
      onDrop={async function handleDrop(e) {
        const files = await Promise.all(
          e.items.filter(isFileDropItem).map(function getFile(item) {
            return item.getFile();
          })
        );
        console.log(
          'Dropped files:',
          files.map(function getName(f) {
            return f.name;
          })
        );
      }}
    >
      {function renderContent({ isDropTarget }: DropZoneRenderProps) {
        return isDropTarget ? (
          <Text as="strong">Drop files to upload.</Text>
        ) : (
          <Text slot="label">Add files or drag them here.</Text>
        );
      }}
    </DropZone>
  );
}
