/**
 * FileTrigger is a style-less primitive that wraps any pressable child and opens the
 * native file picker when it is activated. It renders a visually hidden
 * `<input type="file">` and maps its props onto it:
 * `acceptedFileTypes → accept`, `allowsMultiple → multiple`,
 * `acceptDirectory → webkitdirectory`, and `onSelect(files)` for the change event.
 *
 * It clears the input value before each open, so selecting the same file twice still
 * fires `onSelect`. Re-exported from react-aria-components unchanged — it carries no
 * Antares styling of its own; style the pressable child instead (e.g. an Antares
 * `Button`).
 *
 * @example
 * ```tsx
 * <FileTrigger acceptedFileTypes={['image/png']} onSelect={(files) => { ... }}>
 *   <Button>Select a file</Button>
 * </FileTrigger>
 * ```
 */
export { FileTrigger, type FileTriggerProps } from 'react-aria-components';
