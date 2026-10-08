'use client';

import { Grid } from '@godaddy/antares';
import { FileItem } from '../file-item/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
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
}

/** Full-width responsive image grid with gallery-sized cards. */
export function GridView({ images, onOpen, onRemove, onRetry, onLoadError }: GridViewProps) {
  return (
    <Grid
      as="ul"
      columns="repeat(auto-fill, minmax(min(100%, 15rem), 1fr))"
      gap="md"
      justifyContent="start"
      alignItems="start"
      aria-label="Gallery image grid"
      className={styles.items}
    >
      {images.map(function renderGridItem(image) {
        return (
          <FileItem
            key={image.id}
            image={image}
            variant="vertical"
            onOpen={onOpen}
            onRemove={onRemove}
            onRetry={onRetry}
            onLoadError={onLoadError}
          />
        );
      })}
    </Grid>
  );
}
