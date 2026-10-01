'use client';

import { useCallback } from 'react';
import { Box, Button, Detail, Flex, Icon, Text } from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../file-cover/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

type FileItemVariant = 'horizontal' | 'vertical' | 'thumbnail';

interface FileItemProps {
  /** File to render. */
  image: ImageItem;

  /** Presentation variant from the parent view. */
  variant: FileItemVariant;

  /** Opens a successful image in the viewer. */
  onOpen: (id: string) => void;

  /** Removes the file. */
  onRemove: (image: ImageItem) => void;

  /** Retries an error item. */
  onRetry: (image: ImageItem) => void;
}

const coverVariants: Record<FileItemVariant, FileCoverVariant> = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  thumbnail: 'thumbnail'
};

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry }: FileItemProps) {
  const size = image.size === undefined ? 'Sample image' : `${(image.size / (1024 * 1024)).toFixed(0)}MB`;
  const isError = image.status === 'error';

  const handleRemove = useCallback(
    function handleRemove() {
      onRemove(image);
    },
    [image, onRemove]
  );

  const handleRetry = useCallback(
    function handleRetry() {
      onRetry(image);
    },
    [image, onRetry]
  );

  return (
    <Flex
      as="li"
      elevation="raised"
      direction={variant === 'horizontal' ? 'row' : 'column'}
      gap="sm"
      padding={variant === 'horizontal' ? 'sm' : undefined}
      alignItems={variant === 'horizontal' ? 'center' : undefined}
      className={styles.item}
      data-variant={variant}
    >
      <Box className={styles.coverSlot} data-variant={variant}>
        <FileCover image={image} variant={coverVariants[variant]} onOpen={isError ? undefined : onOpen} />
        {isError && variant === 'thumbnail' ? (
          <Button
            variant="minimal"
            size="sm"
            aria-label={`Retry ${image.name}`}
            onPress={handleRetry}
            className={styles.thumbnailRetry}
          >
            <Icon icon="refresh" aria-hidden="true" />
          </Button>
        ) : null}
      </Box>

      {variant === 'thumbnail' ? null : (
        <Flex
          direction="column"
          gap="xs"
          justifyContent="center"
          padding={variant === 'vertical' ? 'sm' : undefined}
          className={styles.details}
          data-variant={variant}
        >
          <Text className={styles.name}>{image.name}</Text>
          {isError ? (
            <Flex direction="column" gap="xs" alignItems="start">
              <Detail emphasis="critical">{image.errorMessage ?? 'File upload failed.'}</Detail>
              <Button variant="inline" size="sm" aria-label={`Retry ${image.name}`} onPress={handleRetry}>
                <Icon icon="refresh" aria-hidden="true" />
                Retry
              </Button>
            </Flex>
          ) : (
            <Detail>{size}</Detail>
          )}
        </Flex>
      )}

      <Button
        variant="minimal"
        size="sm"
        aria-label={`Remove ${image.name}`}
        onPress={handleRemove}
        className={styles.remove}
        data-variant={variant}
      >
        <Icon icon="x" aria-hidden="true" />
      </Button>
    </Flex>
  );
}
