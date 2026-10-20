'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from '../image/image-surface';
import surfaceStyles from '../image/image-surface.module.css';
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

  /** Retries a failed image when the stable cover action has focus. */
  onRetry?: () => void;

  /** Keeps the active viewer's opener mounted if that same file fails. */
  preserveErrorAction?: boolean;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({
  image,
  variant,
  onOpen,
  onLoadError,
  onLoadSuccess,
  onRetry,
  preserveErrorAction = false
}: FileCoverProps) {
  const [failedThumbnail, setFailedThumbnail] = useState<string | null>(null);
  const wasReady = useRef(false);
  const thumbnail = image.thumbnailSrc && failedThumbnail !== image.thumbnailSrc ? image.thumbnailSrc : undefined;
  const reportLoadError = useCallback(
    function reportLoadError() {
      if (thumbnail && thumbnail !== image.src) setFailedThumbnail(thumbnail);
      else onLoadError?.(image.id);
    },
    [thumbnail, image.src, image.id, onLoadError]
  );
  const reportLoadSuccess = useCallback(
    function reportLoadSuccess() {
      wasReady.current = true;
      onLoadSuccess?.(image.id);
    },
    [image.id, onLoadSuccess]
  );
  const { state, imageRef, onLoad, onError } = useImageLoadState(thumbnail ?? image.src, {
    resetKey: `${image.id}:${image.status ?? ''}`,
    onLoad: reportLoadSuccess,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';
  const canRetry = preserveErrorAction && hasError && !!onRetry;
  const keepOpenAction = !!onOpen && (state === 'ready' || wasReady.current);
  const isLoading = !hasError && state !== 'ready';
  const handlePress = useCallback(
    function handleCoverAction() {
      if (canRetry) onRetry?.();
      else if (!isLoading) onOpen?.(image.id);
    },
    [canRetry, image.id, isLoading, onOpen, onRetry]
  );

  const cover = hasError ? (
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
  ) : (
    <ImageSurface
      ref={imageRef}
      src={thumbnail ?? image.src}
      srcSet={thumbnail ? undefined : image.srcSet}
      sizes={thumbnail ? undefined : image.sizes}
      width={thumbnail ? undefined : image.width}
      height={thumbnail ? undefined : image.height}
      alt={keepOpenAction ? '' : (image.alt ?? image.name)}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
    />
  );

  if (keepOpenAction || canRetry) {
    return (
      <Button
        variant="minimal"
        aria-label={
          canRetry
            ? `Retry image preview for ${image.name}`
            : isLoading
              ? `Loading ${image.name}`
              : `Open ${image.name}`
        }
        aria-disabled={isLoading || undefined}
        onPress={handlePress}
        className={surfaceStyles.openButton}
      >
        {cover}
      </Button>
    );
  }

  return cover;
}
