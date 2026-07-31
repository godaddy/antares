import { DropZone, type DropZoneRenderProps, isFileDropItem, Text } from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

/**
 * Pass a render-prop function as `children` to change the zone's content while a valid drag is active. Branching on `isDropTarget` requires no extra state. Pair it with `getDropOperation` to reject unsupported types - the label only appears when the drag is accepted.
 * @order 4
 */
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
