/** MIME types accepted by the project inquiry attachment picker. */
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/gif', 'image/png'];

/** File extensions accepted when the browser does not provide MIME metadata. */
const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.gif', '.png'];

/** Maximum accepted attachment size in bytes. */
const MAX_FILE_SIZE = 256 * 1024 * 1024;

/** Maximum number of attachments kept in memory at once. */
export const MAX_FILE_COUNT = 10;

/** Maximum combined size of attachments kept in memory at once. */
export const MAX_TOTAL_FILE_SIZE = 256 * 1024 * 1024;

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Returns the stable identity used to deduplicate and remove an attachment. */
export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

/** Returns whether a file matches the supported format and size constraints. */
export function isAcceptedFile(file: File) {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  const hasAcceptedType = ACCEPTED_FILE_TYPES.includes(file.type);
  const hasAcceptedExtension = !file.type && ACCEPTED_FILE_EXTENSIONS.includes(extension);

  return (hasAcceptedType || hasAcceptedExtension) && file.size < MAX_FILE_SIZE;
}

/** Formats an attachment size using the same unit shown by the picker. */
export function formatFileSize(file: File) {
  return `${fileSizeFormatter.format(file.size / (1024 * 1024))} MiB`;
}
