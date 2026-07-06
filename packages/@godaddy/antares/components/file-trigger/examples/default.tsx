import { Button, FileTrigger } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <FileTrigger
      onSelect={function handleSelect(files) {
        if (!files) return;
        console.log('Selected files:', Array.from(files));
      }}
    >
      <Button>Select a file</Button>
    </FileTrigger>
  );
}
