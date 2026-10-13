'use client';

import { Box, Button, Card, CornerActions, Detail, Flex, Icon, Text } from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../file-cover/index.tsx';
import type { ImageItem } from '../../data/types.ts';
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
}

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry, onLoadError }: FileItemProps) {
  const size =
    image.size === undefined ? 'Sample image' : `${fileSizeFormatter.format(image.size / (1024 * 1024))} MiB`;
  const isError = image.status === 'error';

  return (
    <Box as="li" className={styles.item}>
      <Card
        direction={variant === 'horizontal' ? 'row' : 'column'}
        gap="sm"
        padding={variant === 'horizontal' ? 'sm' : '0'}
        alignItems={variant === 'horizontal' ? 'center' : undefined}
        className={styles.card}
        data-variant={variant}
      >
        <Box flex={variant === 'horizontal' ? '0 0 3.5rem' : undefined}>
          <FileCover image={image} variant={variant} onOpen={isError ? undefined : onOpen} onLoadError={onLoadError} />
        </Box>

        <Flex
          direction="column"
          gap="xs"
          justifyContent="center"
          padding={variant === 'vertical' ? 'sm' : undefined}
          inlinePaddingEnd={variant === 'horizontal' ? '2rem' : undefined}
          flex="1 1 auto"
          className={styles.details}
          data-variant={variant}
        >
          <Text maxLines={1}>{image.name}</Text>
          {isError ? (
            <Flex
              direction={variant === 'horizontal' ? 'row' : 'column'}
              gap="xs"
              alignItems={variant === 'horizontal' ? 'center' : 'start'}
              wrap={variant === 'horizontal' ? 'nowrap' : undefined}
              className={styles.errorDetails}
            >
              <Detail emphasis="critical" maxLines={1}>
                {image.errorMessage ?? 'File upload failed.'}
              </Detail>
              <Button variant="inline" size="sm" aria-label={`Retry ${image.name}`} onPress={() => onRetry(image)}>
                <Icon icon="refresh" aria-hidden="true" />
                Retry
              </Button>
            </Flex>
          ) : (
            <Detail>{size}</Detail>
          )}
        </Flex>

        <CornerActions padding="sm">
          <Button variant="secondary" size="sm" aria-label={`Remove ${image.name}`} onPress={() => onRemove(image)}>
            <Icon icon="x" aria-hidden="true" />
          </Button>
        </CornerActions>
      </Card>
    </Box>
  );
}
