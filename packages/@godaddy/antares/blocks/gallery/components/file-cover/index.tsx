'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

export type FileCoverVariant = 'horizontal' | 'vertical' | 'thumbnail';

interface FileCoverProps {
  /** File represented by the cover. */
  image: ImageItem;

  /** Cover geometry used by the parent presentation. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen?: (id: string) => void;

  /** Reports an image decode or network failure to the owning gallery. */
  onLoadError?: (id: string) => void;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onOpen, onLoadError }: FileCoverProps) {
  const [loadError, setLoadError] = useState(false);
  const hasError = image.status === 'error' || loadError;

  useEffect(
    function resetLoadState() {
      setLoadError(false);
    },
    [image.id, image.status]
  );

  const handleOpen = useCallback(
    function handleOpen() {
      onOpen?.(image.id);
    },
    [image.id, onOpen]
  );

  const handleImageError = useCallback(
    function handleImageError() {
      setLoadError(true);
      onLoadError?.(image.id);
    },
    [image.id, onLoadError]
  );

  if (hasError) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        role="img"
        aria-label={`${image.name} failed to upload`}
        rounding="md"
        className={`${styles.surface} ${styles.error}`}
        data-variant={variant}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    );
  }

  const picture = (
    <Box
      as="img"
      src={image.src}
      alt={onOpen ? '' : image.name}
      aria-hidden={onOpen ? true : undefined}
      rounding="md"
      className={styles.surface}
      data-variant={variant}
      onError={handleImageError}
    />
  );

  if (!onOpen) return picture;

  return (
    <Button variant="minimal" aria-label={`Open ${image.name}`} onPress={handleOpen} className={styles.openButton}>
      {picture}
    </Button>
  );
}
