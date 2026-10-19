'use client';

import { useRef } from 'react';
import { Box, Button, Card, CornerActions, Detail, Flex, Icon, Text } from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../file-cover';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

export interface FileItemProps {
  /** File to render. */
  image: ImageItem;

  /** Presentation variant from the parent view. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen: (id: string) => void;

  /** Removes the file. */
  onRemove: (image: ImageItem) => void;

  /** Retries an error item. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Preserves useful precision for small files instead of rounding their size to zero MiB. */
function formatFileSize(bytes: number | undefined) {
  if (bytes === undefined) return 'Size unavailable';
  if (bytes < 1024) return fileSizeFormatter.format(bytes) + ' B';
  if (bytes < 1024 * 1024) return fileSizeFormatter.format(bytes / 1024) + ' KiB';
  return fileSizeFormatter.format(bytes / (1024 * 1024)) + ' MiB';
}

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: FileItemProps) {
  const removeButton = useRef<HTMLButtonElement>(null);
  const size = formatFileSize(image.size);
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading;

  function handleRetry() {
    // Retry disappears while loading. Keep focus on an action in the same file.
    removeButton.current?.focus({ preventScroll: true });
    onRetry(image);
  }

  return (
    <Box as="li" className={styles.item} data-gallery-image-id={image.id}>
      <Card
        direction={variant === 'horizontal' ? 'row' : 'column'}
        gap="sm"
        padding="sm"
        alignItems={variant === 'horizontal' ? 'center' : undefined}
        className={styles.card}
        data-error={isError || undefined}
      >
        <Box flexShrink={0}>
          <FileCover
            image={image}
            variant={variant}
            onOpen={canOpen ? onOpen : undefined}
            onLoadError={onLoadError}
            onLoadSuccess={isLoading ? onLoadSuccess : undefined}
          />
        </Box>

        <Flex
          direction="column"
          gap="sm"
          justifyContent="center"
          flex="1 1 auto"
          className={styles.details}
          data-variant={variant}
        >
          <Text maxLines={1} emphasis={isError ? 'critical' : undefined}>
            {image.name}
          </Text>
          {isError ? (
            <Flex
              direction={variant === 'horizontal' ? 'row' : 'column'}
              gap="xs"
              alignItems={variant === 'horizontal' ? 'center' : 'start'}
              wrap={variant === 'horizontal' ? 'nowrap' : undefined}
              className={styles.errorDetails}
              role={variant === 'vertical' ? 'alert' : undefined}
            >
              <Detail emphasis="critical" maxLines={1}>
                {image.errorMessage ?? 'File needs attention.'}
              </Detail>
              <Button variant="inline" size="sm" aria-label={`Retry ${image.name}`} onPress={handleRetry}>
                <Icon icon="refresh" aria-hidden="true" />
                Retry
              </Button>
            </Flex>
          ) : (
            <Detail>{isLoading ? 'Loading image…' : size}</Detail>
          )}
        </Flex>

        <CornerActions>
          <Button
            ref={removeButton}
            data-gallery-remove=""
            variant="secondary"
            size="sm"
            aria-label={`Remove ${image.name}`}
            onPress={() => onRemove(image)}
          >
            <Icon icon="x" aria-hidden="true" />
          </Button>
        </CornerActions>
      </Card>
    </Box>
  );
}
