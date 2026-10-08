'use client';

import { useCallback, useState } from 'react';
import { Box, Button, Flex, Icon, Image, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/sample-images.ts';
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
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const inspectLoadedImage = useCallback(function inspectLoadedImage(element: HTMLImageElement | null) {
    if (element?.complete) setState(element.naturalWidth > 0 ? 'ready' : 'error');
  }, []);
  const handleLoad = useCallback(function handleLoad() {
    setState('ready');
  }, []);
  const handleError = useCallback(function handleError() {
    setState('error');
  }, []);
  const handleRetry = useCallback(function handleRetry() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);
  const handleOpen = useCallback(
    function handleOpen() {
      onOpen?.(image.id);
    },
    [image.id, onOpen]
  );

  let src = image.src;
  if (attempt > 0 && /^https?:/.test(src)) {
    const url = new URL(src);
    url.searchParams.set('gallery-retry', String(attempt));
    src = url.toString();
  }

  if (state === 'error') {
    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">Couldn’t load {image.name}.</Text>
        <Button variant="inline" aria-label={`Retry ${image.name}`} onPress={handleRetry}>
          Retry
        </Button>
      </Flex>
    );
  }

  const picture = (
    <Box
      as={Image}
      ref={inspectLoadedImage}
      key={attempt}
      src={src}
      alt={onOpen ? '' : image.name}
      className={styles.image}
      data-variant={variant}
      rounding="md"
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {onOpen ? (
        <Button
          variant="minimal"
          aria-label={label ?? `View ${image.name}`}
          aria-current={selected ? 'true' : undefined}
          onPress={handleOpen}
          className={styles.openButton}
          data-selected={selected ? 'true' : undefined}
        >
          {picture}
        </Button>
      ) : (
        picture
      )}
      {state === 'loading' ? <Text>Loading image…</Text> : null}
    </Flex>
  );
}
