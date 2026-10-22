'use client';

import { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardGroup,
  CornerActions,
  Detail,
  Flex,
  Icon,
  Text,
  type CardGroupProps
} from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../image';
import type { ImageItem } from '../../data/types';
import { useGalleryCopy } from '../../data/copy';
import styles from './index.module.css';

interface FileItemsProps extends Pick<FileItemProps, 'onRemove' | 'onLoadError' | 'onLoadSuccess'> {
  /** Presentation chosen by Gallery. */
  view: 'list' | 'grid';

  /** Shared collection order. */
  images: ImageItem[];

  /** Whether the list shows every file. */
  showAll: boolean;

  /** Reveals the remaining files. */
  onShowAll: () => void;

  /** Opens a successful image in the viewer. */
  onOpen: (id: string) => void;

  /** Retries an error item. */
  onRetry: (image: ImageItem) => void;
}

const MAX_VISIBLE_ITEMS = 5;

/** Renders the same collection with either list or grid geometry. */
export function FileItems({
  view,
  images,
  showAll,
  onShowAll,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess
}: FileItemsProps) {
  const { messages } = useGalleryCopy();
  const isList = view === 'list';
  const firstRevealedId = useRef<string | null>(null);
  const visibleImages = isList && !showAll ? images.slice(0, MAX_VISIBLE_ITEMS) : images;
  const errorCount = images.filter((image) => image.status === 'error').length;

  const registerItem = useCallback(function registerItem(id: string, element: HTMLElement | null) {
    if (element && firstRevealedId.current === id) {
      firstRevealedId.current = null;
      element.focus();
    }
  }, []);

  function handleShowAll() {
    firstRevealedId.current = images[visibleImages.length]?.id ?? null;
    onShowAll();
  }

  const handleSelection = useCallback<NonNullable<CardGroupProps<ImageItem>['onSelectionChange']>>(
    function handleSelection(keys) {
      if (keys === 'all') return;
      const id = keys.values().next().value;
      const image = images.find((image) => image.id === id);
      if (!image) return;
      if (image.status === 'error') onRetry(image);
      else onOpen(image.id);
    },
    [images, onOpen, onRetry]
  );

  return (
    <Flex direction="column" gap="sm" className={styles.collection}>
      <CardGroup
        key={view}
        selectionMode="single"
        selectionBehavior="toggle"
        shouldSelectOnPressUp
        selectedKeys={[]}
        onSelectionChange={handleSelection}
        disabledBehavior="selection"
        keyboardNavigationBehavior="tab"
        columns={isList ? '1fr' : 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))'}
        gap="sm"
        justifyContent="start"
        alignItems="start"
        aria-label={isList ? messages.files : messages.imageGrid}
      >
        {visibleImages.map((image) => (
          <FileItem
            key={image.id}
            image={image}
            variant={isList ? 'horizontal' : 'vertical'}
            onRemove={onRemove}
            onLoadError={onLoadError}
            onLoadSuccess={onLoadSuccess}
            onItemRef={registerItem}
          />
        ))}
      </CardGroup>
      {isList ? (
        <ViewBanner
          visibleCount={visibleImages.length}
          totalCount={images.length}
          errorCount={errorCount}
          onShowAll={handleShowAll}
        />
      ) : null}
    </Flex>
  );
}

interface FileItemProps {
  /** File to render. */
  image: ImageItem;

  /** Presentation variant from the parent view. */
  variant: FileCoverVariant;

  /** Removes the file. */
  onRemove: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;

  /** Registers the collection row for revealing expanded files. */
  onItemRef?: (id: string, element: HTMLElement | null) => void;
}

/** Preserves useful precision for small files instead of rounding their size to zero MiB. */
function formatFileSize(bytes: number, fileSizeFormatter: Intl.NumberFormat) {
  if (bytes < 1024) return fileSizeFormatter.format(bytes) + ' B';
  if (bytes < 1024 * 1024) return fileSizeFormatter.format(bytes / 1024) + ' KiB';
  return fileSizeFormatter.format(bytes / (1024 * 1024)) + ' MiB';
}

/** One file item with the same actions and states across list and grid views. */
function FileItem({ image, variant, onRemove, onLoadError, onLoadSuccess, onItemRef }: FileItemProps) {
  const { messages, number } = useGalleryCopy();
  const [coverReady, setCoverReady] = useState(false);
  const size = image.size === undefined ? messages.sizeUnavailable : formatFileSize(image.size, number);
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading && coverReady;

  const handleLoadSuccess = useCallback(
    function handleLoadSuccess(id: string) {
      setCoverReady(true);
      if (isLoading) onLoadSuccess(id);
    },
    [isLoading, onLoadSuccess]
  );

  const handleLoadError = useCallback(
    function handleLoadError(id: string) {
      setCoverReady(false);
      onLoadError(id);
    },
    [onLoadError]
  );

  return (
    <Card
      id={image.id}
      textValue={image.name}
      aria-label={isError ? messages.retryImage(image.name) : canOpen ? messages.openImage(image.name) : image.name}
      ref={(element) => onItemRef?.(image.id, element)}
      isDisabled={!isError && !canOpen}
      direction={variant === 'horizontal' ? 'row' : 'column'}
      gap="sm"
      padding="sm"
      alignItems={variant === 'horizontal' ? 'center' : undefined}
      className={styles.card}
      data-error={isError || undefined}
    >
      <Box flexShrink={0} className={styles.cover}>
        <FileCover image={image} variant={variant} onLoadError={handleLoadError} onLoadSuccess={handleLoadSuccess} />
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
              {image.errorMessage ?? messages.needsAttention}
            </Detail>
            <Flex alignItems="center" gap="xs" className={styles.retry}>
              <Icon icon="refresh" aria-hidden="true" />
              <Text size="sm">{messages.retry}</Text>
            </Flex>
          </Flex>
        ) : (
          <Detail>{isLoading ? messages.loadingImage : size}</Detail>
        )}
      </Flex>

      <CornerActions>
        <Button
          variant="secondary"
          size="sm"
          aria-label={messages.removeImage(image.name)}
          onPress={() => onRemove(image)}
        >
          <Icon icon="x" aria-hidden="true" />
        </Button>
      </CornerActions>
    </Card>
  );
}

interface ViewBannerProps {
  /** Number of files currently rendered. */
  visibleCount: number;

  /** Number of files in the collection. */
  totalCount: number;

  /** Number of failed files. */
  errorCount: number;

  /** Reveals the remaining files. */
  onShowAll: () => void;
}

/** Counter and image-error feedback used below the file list. */
function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const { messages } = useGalleryCopy();
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm">
      <Flex justifyContent="space-between" alignItems="center" gap="sm">
        <Text>{messages.fileCount(visibleCount, totalCount)}</Text>
        {hasMore ? (
          <Button variant="inline" onPress={onShowAll}>
            {messages.showAll}
          </Button>
        ) : null}
      </Flex>

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert">
          <Icon icon="alert" aria-hidden="true" />
          <Text emphasis="critical">{messages.filesNeedAttention(errorCount)}</Text>
        </Flex>
      ) : null}
    </Flex>
  );
}
