import { DropZone, isFileDropItem, Flex, Text } from '@godaddy/antares';

export function CustomContentExample() {
  return (
    <DropZone
      onDrop={function handleDrop(e) {
        const files = e.items.filter(isFileDropItem);
        console.log('Dropped files:', files);
      }}
    >
      <Flex direction="column" alignItems="center" gap="xs">
        <Text slot="label">Drag your images here</Text>
        <Text>PNG, JPG, or GIF up to 10MB</Text>
      </Flex>
    </DropZone>
  );
}
