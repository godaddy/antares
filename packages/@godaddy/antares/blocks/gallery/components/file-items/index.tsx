'use client';

import { FileItem, type FileItemProps } from '../file-item/index.tsx';
import type { ImageItem } from '../../data/types.ts';

interface FileItemsProps extends Pick<FileItemProps, 'onOpen' | 'onRemove' | 'onRetry' | 'onLoadError'> {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Layout variant shared by every item in the collection. */
  variant: FileItemProps['variant'];
}

/** Shared collection renderer used by the list and grid layouts. */
export function FileItems({ images, variant, onOpen, onRemove, onRetry, onLoadError }: FileItemsProps) {
  return images.map(function renderFileItem(image) {
    return (
      <FileItem
        key={image.id}
        image={image}
        variant={variant}
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
      />
    );
  });
}
