/** The load state shown by a gallery file item. */
type ImageStatus = 'ready' | 'loading' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible action name. */
  name: string;

  /** Description of the visual content. Falls back to the filename for file-management use cases. */
  alt?: string;

  /** Remote URL, data URL, or locally owned object URL for the full image. */
  src: string;

  /** Smaller resource for covers and the thumbnail rail; defaults to src. */
  thumbnailSrc?: string;

  /** Responsive full-image candidates supplied by the image service. */
  srcSet?: string;

  /** Display sizes corresponding to srcSet. */
  sizes?: string;

  /** Intrinsic full-image width, when known. */
  width?: number;

  /** Intrinsic full-image height, when known. */
  height?: number;

  /** Actual bytes when known; unknown remote sizes are excluded from the byte budget. */
  size?: number;

  /** Current image load state. */
  status?: ImageStatus;

  /** Optional message associated with an image error. */
  errorMessage?: string;
}

/** Local collection budgets. Initial images count toward these limits but are never discarded. */
export interface GalleryLimits {
  /** Maximum collection size, including initial images. Defaults to 50. */
  maxFiles?: number;

  /** Exclusive per-file byte limit. Defaults to 256 MiB. */
  maxFileSize?: number;

  /** Inclusive total byte budget for images with a known size. Defaults to 256 MiB. */
  maxTotalSize?: number;
}
