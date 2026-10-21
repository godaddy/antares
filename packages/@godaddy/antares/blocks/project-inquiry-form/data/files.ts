/** MIME types accepted by the project inquiry attachment picker. */
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/gif', 'image/png'];

/** File extensions accepted when the browser does not provide MIME metadata. */
const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.gif', '.png'];

const IMAGE_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png'];

/** Maximum accepted attachment size in bytes. */
const MAX_FILE_SIZE = 256 * 1024 * 1024;

/** Maximum number of attachments kept in memory at once. */
export const MAX_FILE_COUNT = 10;

/** Maximum combined size of attachments kept in memory at once. */
export const MAX_TOTAL_FILE_SIZE = 256 * 1024 * 1024;

const byteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const kibibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const mebibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Returns the stable identity used to deduplicate and remove an attachment. */
export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

/** Returns the extension used when a browser does not provide MIME metadata. */
function fileExtension(file: File) {
  const lastDot = file.name.lastIndexOf('.');
  return lastDot >= 0 ? file.name.slice(lastDot).toLowerCase() : '';
}

/** Classifies a supported attachment for its local preview. */
export function filePreviewKind(file: File) {
  const extension = fileExtension(file);

  if (file.type === 'application/pdf' || (!file.type && extension === '.pdf')) return 'pdf';
  if (file.type.startsWith('image/') || (!file.type && IMAGE_FILE_EXTENSIONS.includes(extension))) return 'image';

  return 'unknown';
}

/** Returns whether a file matches the supported format and size constraints. */
export function isAcceptedFile(file: File) {
  const extension = fileExtension(file);
  const hasAcceptedType = ACCEPTED_FILE_TYPES.includes(file.type);
  const hasAcceptedExtension = !file.type && ACCEPTED_FILE_EXTENSIONS.includes(extension);

  return (hasAcceptedType || hasAcceptedExtension) && file.size < MAX_FILE_SIZE;
}

/** Formats an attachment size using the same unit shown by the picker. */
export function formatFileSize(file: File) {
  if (file.size < 1024) return `${byteFormatter.format(file.size)} B`;
  if (file.size < 1024 * 1024) return `${kibibyteFormatter.format(file.size / 1024)} KiB`;

  return `${mebibyteFormatter.format(file.size / (1024 * 1024))} MiB`;
}
