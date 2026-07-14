import { Button, FileTrigger, type FileTriggerProps } from '@godaddy/antares';

export type PlaygroundExampleProps = Pick<FileTriggerProps, 'allowsMultiple' | 'acceptDirectory'>;

export function PlaygroundExample({ allowsMultiple = false, acceptDirectory = false }: PlaygroundExampleProps) {
  return (
    <FileTrigger
      allowsMultiple={allowsMultiple}
      acceptDirectory={acceptDirectory}
      onSelect={function handleSelect(files) {
        if (!files) return;
        console.log('Selected:', Array.from(files));
      }}
    >
      <Button>{acceptDirectory ? 'Select a folder' : 'Select a file'}</Button>
    </FileTrigger>
  );
}
