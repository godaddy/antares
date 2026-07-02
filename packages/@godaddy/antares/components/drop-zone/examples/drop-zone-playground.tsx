import { DropZone, type DropZoneProps, isFileDropItem, Text } from '@godaddy/antares';

export type PlaygroundExampleProps = Pick<DropZoneProps, 'isDisabled'>;

export function PlaygroundExample({ isDisabled = false }: PlaygroundExampleProps) {
  return (
    <DropZone
      isDisabled={isDisabled}
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    >
      <Text slot="label">Drop files to upload.</Text>
    </DropZone>
  );
}
