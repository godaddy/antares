'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode
} from 'react';
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

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

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
/** RAC's post-mount focus reconciliation runs after the new virtualized rows are painted. */
const FOCUS_RESTORE_DELAY_MS = 100;
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
  /** Whether the collection can remount items while changing virtualizer layout. */
  shouldVirtualize: boolean;

  /** Covers that have successfully decoded. */
  readyCoverIds: ReadonlySet<string>;

  /** Records a successful cover decode. */
  onCoverReady: (id: string) => void;

  /** Clears readiness after a cover failure. */
  onCoverFailed: (id: string) => void;
}

const FileItemsContext = createContext<FileItemsContextValue | undefined>(undefined);

interface FocusTarget {
  /** Stable item ID to focus after a collection remount. */
  id: string;

  /** Restores the item action when the remove button had focus. */
  removeButton: boolean;
}

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
  // Crossing the virtualization threshold remounts CardGroup; restore adjacent-row focus after that.
  const focusAfterRemount = useRef<FocusTarget | null>(null);
  // Virtualizer remounts when switching between ListLayout and GridLayout.
  const [readyCoverIds, setReadyCoverIds] = useState(() => new Set<string>());
  const visibleImages = isList && !showAll ? images.slice(0, MAX_VISIBLE_ITEMS) : images;
  const shouldVirtualize = visibleImages.length >= MIN_VIRTUALIZED_ITEMS;
  const errorCount = images.filter((image) => image.status === 'error').length;

  const restoreFocusTarget = useCallback(function restoreFocusTarget(element?: HTMLElement | null) {
    const target = focusAfterRemount.current;
    if (!target) return;
    const item =
      element ??
      Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-item-id]')).find(
        (candidate) => candidate.dataset.galleryItemId === target.id
      );
    if (!(item instanceof HTMLElement) || item.dataset.galleryItemId !== target.id) return;
    const focusItem = item;
    const focusTargetDetails = target;
    focusAfterRemount.current = null;
    function focusTarget() {
      if (!focusItem.isConnected) return;
      const removeButton = focusTargetDetails.removeButton
        ? focusItem.querySelector<HTMLButtonElement>('button[aria-label^="Remove "]')
        : null;
      (removeButton ?? focusItem).focus();
    }
    focusTarget();
    // RAC GridList may restore roving focus after the Virtualizer mounts; repeat after that pass.
    setTimeout(focusTarget, FOCUS_RESTORE_DELAY_MS);
  }, []);

  const registerItem = useCallback(
    function registerItem(id: string, element: HTMLElement | null) {
      if (!element) return;
      if (firstRevealedId.current === id) {
        firstRevealedId.current = null;
        element.focus();
        return;
      }
      if (focusAfterRemount.current?.id === id) {
        restoreFocusTarget(element);
      }
    },
    [restoreFocusTarget]
  );

  const captureFocusedItem = useCallback(function captureFocusedItem() {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) return;
    const item = activeElement.closest<HTMLElement>('[data-gallery-item-id]');
    const id = item?.dataset.galleryItemId;
    if (!id) return;
    focusAfterRemount.current = {
      id,
      removeButton: activeElement.matches('button[aria-label^="Remove "]')
    };
  }, []);

  const forgetCover = useCallback(function forgetCover(id: string) {
    setReadyCoverIds(function removeRemovedId(current) {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const handleRemove = useCallback(
    function handleRemove(image: ImageItem) {
      const index = visibleImages.findIndex(function findRemoved(item) {
        return item.id === image.id;
      });
      const nextLength = visibleImages.length - 1;
      forgetCover(image.id);
      if (shouldVirtualize && nextLength < MIN_VIRTUALIZED_ITEMS && index >= 0) {
        const id = visibleImages[index + 1]?.id ?? visibleImages[index - 1]?.id;
        if (id) focusAfterRemount.current = { id, removeButton: false };
      }
      onRemove(image);
    },
    [forgetCover, onRemove, shouldVirtualize, visibleImages]
  );

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

  useIsomorphicLayoutEffect(
    function restoreFocusAfterCollectionRemount() {
      restoreFocusTarget();
    },
    [shouldVirtualize, restoreFocusTarget]
  );

  useEffect(
    function restoreFocusAfterCollectionPaint() {
      restoreFocusTarget();
    },
    [shouldVirtualize, visibleImages, restoreFocusTarget]
  );

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
      onRemove={handleRemove}
      onLoadError={onLoadError}
      onLoadSuccess={onLoadSuccess}
      onItemRef={registerItem}
    />
  );

  const virtualizedCollection = (
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
      dependencies={[images, visibleImages, shouldVirtualize, isList]}
      gap="0"
      className={styles.group}
      style={{ display: 'block' }}
    >
      {renderItem}
    </CardGroup>
  );
  const collection = shouldVirtualize ? (
    virtualizedCollection
  ) : (
    <CollectionFocusBoundary onUnmount={captureFocusedItem}>
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
        {visibleImages.map(function renderNonVirtualizedItem(image) {
          return (
            <FileItem
              key={image.id}
              image={image}
              variant={isList ? 'horizontal' : 'vertical'}
              onRemove={handleRemove}
              onLoadError={onLoadError}
              onLoadSuccess={onLoadSuccess}
              onItemRef={registerItem}
            />
          );
        })}
      </CardGroup>
    </CollectionFocusBoundary>
  );

  return (
    <FileItemsContext.Provider
      value={{ shouldVirtualize, readyCoverIds, onCoverReady: markCoverReady, onCoverFailed: markCoverFailed }}
    >
      <Flex direction="column" gap="sm" className={styles.collection}>
        {shouldVirtualize ? (
          isList ? (
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

interface CollectionFocusBoundaryProps {
  /** Captures the active collection target immediately before the collection unmounts. */
  onUnmount: () => void;

  /** Collection subtree whose focus should survive a remount. */
  children: ReactNode;
}

function CollectionFocusBoundary({ onUnmount, children }: CollectionFocusBoundaryProps) {
  const onUnmountRef = useRef(onUnmount);
  onUnmountRef.current = onUnmount;

  useIsomorphicLayoutEffect(function captureBeforeUnmount() {
    return function captureCollectionFocus() {
      onUnmountRef.current();
    };
  }, []);

  return children;
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
  const { shouldVirtualize, readyCoverIds, onCoverReady, onCoverFailed } = context;
  const [localCoverReady, setLocalCoverReady] = useState(false);
  const size = image.size === undefined ? 'Size unavailable' : formatFileSize(image.size);
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading && (shouldVirtualize ? readyCoverIds.has(image.id) : localCoverReady);

  const handleLoadSuccess = useCallback(
    function handleLoadSuccess(id: string) {
      setLocalCoverReady(true);
      if (shouldVirtualize) onCoverReady(id);
      if (isLoading) onLoadSuccess(id);
    },
    [isLoading, onCoverReady, onLoadSuccess, shouldVirtualize]
  );

  const handleLoadError = useCallback(
    function handleLoadError(id: string) {
      setLocalCoverReady(false);
      if (shouldVirtualize) onCoverFailed(id);
      onLoadError(id);
    },
    [onCoverFailed, onLoadError, shouldVirtualize]
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
      data-gallery-item-id={image.id}
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
