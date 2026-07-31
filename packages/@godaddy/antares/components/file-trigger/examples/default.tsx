import { Button, FileTrigger } from '@godaddy/antares';

/**
 * Wrap any pressable component. Activating the child opens the native file picker; the selected files arrive in `onSelect`.
 * @order 1
 */
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
