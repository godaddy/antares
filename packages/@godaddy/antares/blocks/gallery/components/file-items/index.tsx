'use client';

import { FileItem, type FileItemProps } from '../file-item';
import type { ImageItem } from '../../data/types';

interface FileItemsProps
  extends Pick<FileItemProps, 'onOpen' | 'onRemove' | 'onRetry' | 'onLoadError' | 'onLoadSuccess'> {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Layout variant shared by every item in the collection. */
  variant: FileItemProps['variant'];

  /** Keeps the viewer opener mounted if that same file fails. */
  preserveFocusActionId?: string | null;
}

/** Shared collection renderer used by the list and grid layouts. */
export function FileItems({
  images,
  variant,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess,
  preserveFocusActionId
}: FileItemsProps) {
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
        onLoadSuccess={onLoadSuccess}
        preserveFocusAction={image.id === preserveFocusActionId}
      />
    );
  });
}
