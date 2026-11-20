'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardGroup,
  CornerActions,
  Detail,
  Flex,
  GridLayout,
  Icon,
  ListLayout,
  Size,
  Text,
  Virtualizer,
  type CardGroupProps
} from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../image';
import type { ImageItem } from '../../data/types';
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
/** Virtualization is useful once the rendered collection is large enough to scroll. */
const MIN_VIRTUALIZED_ITEMS = 20;
/** List rows are measured; the estimate only sizes the scrollbar before they mount. */
const listLayoutOptions = { estimatedRowSize: 80, gap: 8 };

/** Grid cells keep the cover square, so the cell height follows its width. */
const gridLayoutOptions = {
  minItemSize: new Size(200, 280),
  maxItemSize: new Size(320, 400),
  minSpace: new Size(8, 8),
  preserveAspectRatio: true
};

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

interface FileItemsContextValue {
  /** Covers that have successfully decoded. */
  readyCoverIds: ReadonlySet<string>;

  /** Records a successful cover decode. */
  onCoverReady: (id: string) => void;

  /** Clears readiness after a cover failure. */
  onCoverFailed: (id: string) => void;
}

const FileItemsContext = createContext<FileItemsContextValue | undefined>(undefined);

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
  const isList = view === 'list';
  const firstRevealedId = useRef<string | null>(null);
  // Survive Virtualizer remounts when switching list/grid layouts.
  const [readyCoverIds, setReadyCoverIds] = useState(() => new Set<string>());
  const visibleImages = isList && !showAll ? images.slice(0, MAX_VISIBLE_ITEMS) : images;
  const shouldVirtualize = visibleImages.length >= MIN_VIRTUALIZED_ITEMS;
  const errorCount = images.filter((image) => image.status === 'error').length;

  const registerItem = useCallback(function registerItem(id: string, element: HTMLElement | null) {
    if (element && firstRevealedId.current === id) {
      firstRevealedId.current = null;
      element.focus();
    }
  }, []);

  const markCoverReady = useCallback(function markCoverReady(id: string) {
    setReadyCoverIds(function addReadyId(current) {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const markCoverFailed = useCallback(function markCoverFailed(id: string) {
    setReadyCoverIds(function removeReadyId(current) {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
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

  const renderItem = (image: ImageItem) => (
    <FileItem
      image={image}
      variant={isList ? 'horizontal' : 'vertical'}
      onRemove={onRemove}
      onLoadError={onLoadError}
      onLoadSuccess={onLoadSuccess}
      onItemRef={registerItem}
    />
  );

  const collection = shouldVirtualize ? (
    <CardGroup
      selectionMode="single"
      selectionBehavior="toggle"
      shouldSelectOnPressUp
      selectedKeys={[]}
      onSelectionChange={handleSelection}
      disabledBehavior="selection"
      keyboardNavigationBehavior="tab"
      aria-label={isList ? 'Gallery files' : 'Gallery image grid'}
      items={visibleImages}
      // The layout owns item geometry, so CSS grid and gap must not apply.
      gap="0"
      className={styles.group}
      style={{ display: 'block' }}
    >
      {renderItem}
    </CardGroup>
  ) : (
    <CardGroup
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
      aria-label={isList ? 'Gallery files' : 'Gallery image grid'}
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
  );

  return (
    <FileItemsContext.Provider value={{ readyCoverIds, onCoverReady: markCoverReady, onCoverFailed: markCoverFailed }}>
      <Flex direction="column" gap="sm" className={styles.collection}>
        {shouldVirtualize ? (
          isList ? (
            // A layout class change cannot be applied to a mounted collection, so each view remounts it.
            <Virtualizer key="list" layout={ListLayout} layoutOptions={listLayoutOptions} shouldObserveItemSize>
              {collection}
            </Virtualizer>
          ) : (
            <Virtualizer key="grid" layout={GridLayout} layoutOptions={gridLayoutOptions}>
              {collection}
            </Virtualizer>
          )
        ) : (
          collection
        )}
        {isList ? (
          <ViewBanner
            visibleCount={visibleImages.length}
            totalCount={images.length}
            errorCount={errorCount}
            onShowAll={handleShowAll}
          />
        ) : null}
      </Flex>
    </FileItemsContext.Provider>
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
function formatFileSize(bytes: number) {
  if (bytes < 1024) return fileSizeFormatter.format(bytes) + ' B';
  if (bytes < 1024 * 1024) return fileSizeFormatter.format(bytes / 1024) + ' KiB';
  return fileSizeFormatter.format(bytes / (1024 * 1024)) + ' MiB';
}

/** One file item with the same actions and states across list and grid views. */
function FileItem({ image, variant, onRemove, onLoadError, onLoadSuccess, onItemRef }: FileItemProps) {
  const context = useContext(FileItemsContext);
  if (!context) throw new Error('FileItem must be rendered within FileItems.');
  const { readyCoverIds, onCoverReady, onCoverFailed } = context;
  const size = image.size === undefined ? 'Size unavailable' : formatFileSize(image.size);
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading && readyCoverIds.has(image.id);

  const handleLoadSuccess = useCallback(
    function handleLoadSuccess(id: string) {
      onCoverReady(id);
      if (isLoading) onLoadSuccess(id);
    },
    [isLoading, onCoverReady, onLoadSuccess]
  );

  const handleLoadError = useCallback(
    function handleLoadError(id: string) {
      onCoverFailed(id);
      onLoadError(id);
    },
    [onCoverFailed, onLoadError]
  );

  return (
    <Card
      id={image.id}
      textValue={image.name}
      aria-label={isError ? `Retry ${image.name}` : canOpen ? `Open ${image.name}` : image.name}
      ref={(element) => onItemRef?.(image.id, element)}
      isDisabled={!isError && !canOpen}
      direction={variant === 'horizontal' ? 'row' : 'column'}
      gap="sm"
      padding="sm"
      alignItems={variant === 'horizontal' ? 'center' : undefined}
      className={styles.card}
      data-error={isError || undefined}
      data-variant={variant}
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
            as={Detail}
            gap="xs"
            alignItems="center"
            className={styles.retry}
            role={variant === 'vertical' ? 'alert' : undefined}
          >
            <Icon icon="refresh" aria-hidden="true" />
            Retry
          </Flex>
        ) : (
          <Detail>{isLoading ? 'Loading image…' : size}</Detail>
        )}
      </Flex>

      <CornerActions>
        <Button
          variant="secondary"
          size="sm"
          aria-label={`Remove ${image.name}`}
          onPress={function removeFile() {
            onRemove(image);
          }}
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
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm">
      <Flex justifyContent="space-between" alignItems="center" gap="sm">
        <Text>
          {visibleCount.toLocaleString('en-US')} of {totalCount.toLocaleString('en-US')} files
        </Text>
        {hasMore ? (
          <Button variant="inline" onPress={onShowAll}>
            Show all
          </Button>
        ) : null}
      </Flex>

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert">
          <Icon icon="alert" aria-hidden="true" />
          <Text emphasis="critical">
            {errorCount.toLocaleString('en-US')} file{errorCount === 1 ? ' needs' : 's need'} attention.
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
}
