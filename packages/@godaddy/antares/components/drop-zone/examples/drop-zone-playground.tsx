import { DropZone, type DropZoneProps, isFileDropItem } from '@godaddy/antares';

export type PlaygroundExampleProps = Pick<DropZoneProps, 'isDisabled'>;

export function PlaygroundExample({ isDisabled = false }: PlaygroundExampleProps) {
  return (
    <DropZone
      isDisabled={isDisabled}
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    />
  );
}
