'use client';

import { Button, Flex, Icon, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from './image-surface';
import styles from './index.module.css';

interface GalleryImageProps {
  /** Image to load; remount this component when its identity changes. */
  image: ImageItem;

  /** Presentation size for the image. */
  variant?: 'default' | 'viewer' | 'thumbnail';

  /** Optional activation for cards and the viewer's thumbnail strip. */
  onOpen?: (id: string) => void;

  /** Accessible action name when the image is interactive. */
  label?: string;

  /** Marks the viewer's current thumbnail. */
  selected?: boolean;

  /** Loading strategy for the image resource. */
  loading?: 'eager' | 'lazy';
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({
  image,
  variant = 'default',
  onOpen,
  label,
  selected,
  loading = 'lazy'
}: GalleryImageProps) {
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(image.src, {
    resetKey: image.id
  });

  if (state === 'error') {
    if (variant === 'thumbnail') {
      return (
        <Flex
          className={`${styles.image} ${styles.errorSurface}`}
          data-variant={variant}
          role="img"
          aria-label={`${image.name} failed to load`}
        >
          <Icon icon="alert" aria-hidden="true" />
        </Flex>
      );
    }

    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">Couldn’t load {image.name}.</Text>
        <Button variant="inline" aria-label={`Retry ${image.name}`} onPress={retry}>
          Retry
        </Button>
      </Flex>
    );
  }

  const picture = (
    <ImageSurface
      ref={imageRef}
      key={attempt}
      src={src}
      alt={image.name}
      className={styles.image}
      variant={variant}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={label ?? `View ${image.name}`}
      selected={selected}
    />
  );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {picture}
      {state === 'loading' ? <Text>Loading image…</Text> : null}
    </Flex>
  );
}
