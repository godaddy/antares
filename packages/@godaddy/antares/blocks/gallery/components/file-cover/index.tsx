'use client';

import { useCallback, useState } from 'react';
import { Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from '../image/image-surface';
import styles from './index.module.css';

/** Cover geometry used by Gallery's list and grid presentations. */
export type FileCoverVariant = 'horizontal' | 'vertical';

interface FileCoverProps {
  /** File represented by the cover. */
  image: ImageItem;

  /** Cover geometry used by the parent presentation. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen?: (id: string) => void;

  /** Reports an image decode or network failure to the owning gallery. */
  onLoadError?: (id: string) => void;

  /** Reports a successful retry to the owning gallery. */
  onLoadSuccess?: (id: string) => void;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onOpen, onLoadError, onLoadSuccess }: FileCoverProps) {
  const [failedThumbnail, setFailedThumbnail] = useState<string | null>(null);
  const thumbnail = image.thumbnailSrc && failedThumbnail !== image.thumbnailSrc ? image.thumbnailSrc : undefined;
  const reportLoadError = useCallback(
    function reportLoadError() {
      if (thumbnail) setFailedThumbnail(thumbnail);
      else onLoadError?.(image.id);
    },
    [thumbnail, image.id, onLoadError]
  );
  const reportLoadSuccess = useCallback(() => onLoadSuccess?.(image.id), [image.id, onLoadSuccess]);
  const { state, imageRef, onLoad, onError } = useImageLoadState(thumbnail ?? image.src, {
    resetKey: `${image.id}:${image.status ?? ''}`,
    onLoad: onLoadSuccess ? reportLoadSuccess : undefined,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';

  if (hasError) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        role="img"
        aria-label={`${image.name}: ${image.errorMessage ?? 'File needs attention.'}`}
        rounding="md"
        className={`${styles.surface} ${styles.error}`}
        data-variant={variant}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    );
  }

  return (
    <ImageSurface
      ref={imageRef}
      src={thumbnail ?? image.src}
      srcSet={thumbnail ? undefined : image.srcSet}
      sizes={thumbnail ? undefined : image.sizes}
      width={thumbnail ? undefined : image.width}
      height={thumbnail ? undefined : image.height}
      alt={image.alt ?? image.name}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={`Open ${image.name}`}
    />
  );
}
