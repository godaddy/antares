/** The load state shown by a gallery file item. */
export type ImageStatus = 'ready' | 'loading' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible image name. */
  name: string;

  /** Remote URL, data URL, or locally owned object URL. */
  src: string;

  /** Actual bytes when known; omitted for remote samples. */
  size?: number;

  /** Load state used by the list/grid examples. */
  status?: ImageStatus;

  /** Optional message associated with an image error. */
  errorMessage?: string;
}
