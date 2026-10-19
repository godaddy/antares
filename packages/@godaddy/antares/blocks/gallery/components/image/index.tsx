'use client';

import { Button, type ButtonProps, Flex, Icon, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from './image-surface';
import styles from './index.module.css';
import surfaceStyles from './image-surface.module.css';

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

  /** Keyboard position in the thumbnail rail. */
  tabIndex?: number;

  /** Handles thumbnail keyboard navigation. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({
  image,
  variant = 'default',
  onOpen,
  label,
  selected,
  loading = 'lazy',
  tabIndex,
  onKeyDown
}: GalleryImageProps) {
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(
    variant === 'thumbnail' ? (image.thumbnailSrc ?? image.src) : image.src,
    {
      resetKey: image.id
    }
  );

  if (state === 'error') {
    if (variant === 'thumbnail') {
      const errorSurface = (
        <Flex
          alignItems="center"
          justifyContent="center"
          className={`${styles.image} ${styles.errorSurface}`}
          data-variant={variant}
          role="img"
          aria-label={`${image.name} failed to load`}
        >
          <Icon icon="alert" aria-hidden="true" />
        </Flex>
      );

      if (!onOpen) return errorSurface;

      return (
        <Button
          variant={selected ? 'secondary' : 'minimal'}
          aria-label={label ?? `View ${image.name}`}
          excludeFromTabOrder={tabIndex === -1}
          onKeyDown={onKeyDown}
          aria-current={selected ? 'true' : undefined}
          onPress={() => onOpen(image.id)}
          className={surfaceStyles.openButton}
        >
          {errorSurface}
        </Button>
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
      alt={image.alt ?? image.name}
      srcSet={variant === 'thumbnail' ? undefined : image.srcSet}
      sizes={variant === 'thumbnail' ? undefined : image.sizes}
      width={variant === 'thumbnail' ? 80 : image.width}
      height={variant === 'thumbnail' ? 60 : image.height}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
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
