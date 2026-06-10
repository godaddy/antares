import { DropZone, type DropZoneProps, isFileDropItem } from '@godaddy/antares';

export function DefaultExample(props?: Partial<DropZoneProps>) {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
      {...props}
    />
  );
}
