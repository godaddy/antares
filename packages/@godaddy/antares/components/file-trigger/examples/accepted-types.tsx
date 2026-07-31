import { Button, FileTrigger } from '@godaddy/antares';

/**
 * Restrict the picker to specific MIME types with `acceptedFileTypes`, and allow more than one file with `allowsMultiple`.
 * @order 2
 */
export function AcceptedTypesExample() {
  return (
    <FileTrigger
      acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif']}
      allowsMultiple
      onSelect={function handleSelect(files) {
        if (!files) return;
        console.log('Selected images:', Array.from(files));
      }}
    >
      <Button>Select images</Button>
    </FileTrigger>
  );
}
