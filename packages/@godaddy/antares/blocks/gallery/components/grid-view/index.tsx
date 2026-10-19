'use client';

import { Grid } from '@godaddy/antares';
import { FileItems } from '../file-items';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

interface GridViewProps {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Opens the media viewer. */
  onOpen: (id: string) => void;

  /** Removes an image from the collection. */
  onRemove: (image: ImageItem) => void;

  /** Retries a failed upload. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

/** Cards keep a consistent preview size, including small collections. */
export function GridView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: GridViewProps) {
  return (
    <Grid
      as="ul"
      columns="repeat(auto-fill, minmax(min(100%, 240px), 1fr))"
      gap="sm"
      justifyContent="start"
      alignItems="start"
      aria-label="Gallery image grid"
      className={styles.items}
    >
      <FileItems
        images={images}
        variant="vertical"
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
      />
    </Grid>
  );
}
