import { Button, FileTrigger } from '@godaddy/antares';

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
