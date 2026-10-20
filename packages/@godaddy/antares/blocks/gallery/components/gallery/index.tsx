'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  Box,
  Detail,
  type DropEvent,
  type DropOptions,
  Flex,
  Heading,
  Icon,
  Label,
  ProgressBar,
  SegmentedController,
  SegmentedControllerItem,
  Tag,
  Text,
  isFileDropItem,
  useDrop
} from '@godaddy/antares';
import { EmptyState } from '../empty-state';
import type { GalleryLimits, ImageItem } from '../../data/types';
import { acceptedTypes, defaultLimits, useGalleryImages } from '../../hooks/use-gallery-images';
import { GridView } from '../grid-view';
import { ListView } from '../list-view';
import { UploadPrompt } from '../upload-prompt';
import { Viewer } from '../viewer';
import styles from './index.module.css';

export interface GalleryProps {
  /** Initial images; read once on mount. Defaults to an empty gallery. IDs must be unique. */
  initialImages?: ImageItem[];

  /** Initial presentation; switching views preserves the collection. */
  defaultView?: 'list' | 'grid';

  /** Local ingestion budgets. Initial images are retained even when they exceed a budget. */
  limits?: GalleryLimits;

  /** Layout and viewer navigation direction. Pass the host application's direction. Defaults to ltr. */
  dir?: 'ltr' | 'rtl';

  /** Notifies the host after collection or load-state changes. Blob URLs remain owned by this instance. */
  onImagesChange?: (images: ImageItem[]) => void;
}

/**
 * Copyable local gallery with shared list/grid state and a modal image viewer.
 * Files stay in this browser session. Replace ingestion/removal with your service integration
 * when persistence is needed; initialImages is read only on mount.
 *
 * @example
 * <Gallery initialImages={[{ id: 'cover', name: 'Cover.jpg', src: '/cover.jpg' }]} />
 */
export function Gallery({
  initialImages = [],
  defaultView = 'grid',
  limits,
  dir = 'ltr',
  onImagesChange
}: GalleryProps) {
  const resolvedLimits = {
    maxFiles: limits?.maxFiles ?? defaultLimits.maxFiles,
    maxFileSize: limits?.maxFileSize ?? defaultLimits.maxFileSize,
    maxTotalSize: limits?.maxTotalSize ?? defaultLimits.maxTotalSize
  };
  const { images, error, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError } =
    useGalleryImages(initialImages, resolvedLimits, onImagesChange);
  const [view, setView] = useState(defaultView);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewerOpenerId, setViewerOpenerId] = useState<string | null>(null);
  const [failedOpenerId, setFailedOpenerId] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const removalFocus = useRef<{ id: string | null } | null>(null);

  useLayoutEffect(
    function focusAfterRemoval() {
      if (!removalFocus.current) return;
      const id = removalFocus.current.id;
      removalFocus.current = null;
      const item = Array.from(dropZoneRef.current?.querySelectorAll<HTMLElement>('[data-gallery-image-id]') ?? []).find(
        (element) => element.dataset.galleryImageId === id
      );
      (item?.querySelector<HTMLButtonElement>('[data-gallery-remove]') ?? addButton.current)?.focus();
    },
    [images]
  );

  const handleRemoveImage = useCallback(
    function handleRemoveImage(image: ImageItem) {
      const items = Array.from(dropZoneRef.current?.querySelectorAll<HTMLElement>('[data-gallery-image-id]') ?? []);
      const index = items.findIndex((element) => element.dataset.galleryImageId === image.id);
      removalFocus.current = { id: (items[index + 1] ?? items[index - 1])?.dataset.galleryImageId ?? null };
      removeImage(image);
    },
    [removeImage]
  );

  const handleDropOperation = useCallback<NonNullable<DropOptions['getDropOperation']>>(function handleDropOperation(
    types
  ) {
    return acceptedTypes.some(function supportsType(type) {
      return types.has(type);
    })
      ? 'copy'
      : 'cancel';
  }, []);

  const handleDrop = useCallback(
    async function handleDrop(event: DropEvent) {
      const results = await Promise.allSettled(event.items.filter(isFileDropItem).map((item) => item.getFile()));
      const files = results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
      await addFiles(files);
      if (results.some((result) => result.status === 'rejected')) {
        reportError('Some dropped files couldn’t be read. Please select them again.');
      }
    },
    [addFiles, reportError]
  );

  const handleViewChange = useCallback(function handleViewChange(key: string) {
    if (key === 'list' || key === 'grid') setView(key);
  }, []);

  const handleOpenImage = useCallback(
    function handleOpenImage(id: string) {
      if (activeId === null) {
        setViewerOpenerId(id);
        setFailedOpenerId(null);
      }
      setActiveId(id);
    },
    [activeId]
  );

  const handleImageLoadError = useCallback(
    function handleImageLoadError(id: string) {
      if (activeId !== null && viewerOpenerId === id) setFailedOpenerId(id);
      setActiveId((current) => (current === id ? null : current));
      markError(id);
    },
    [activeId, markError, viewerOpenerId]
  );

  const handleCloseViewer = useCallback(function handleCloseViewer() {
    setActiveId(null);
    setViewerOpenerId(null);
  }, []);

  const { dropProps, isDropTarget } = useDrop({
    ref: dropZoneRef,
    hasDropButton: false,
    isDisabled: activeId !== null,
    getDropOperation: handleDropOperation,
    onDrop: handleDrop
  });

  return (
    <>
      <Flex
        ref={dropZoneRef}
        dir={dir}
        role="region"
        aria-label="Add files to gallery"
        padding="0"
        alignItems="stretch"
        justifyContent="start"
        {...dropProps}
        className={styles.dropZone}
      >
        <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
          <Flex gap="md" wrap="wrap" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="sm" wrap="wrap">
              <Heading level={2}>Gallery</Heading>
              <Tag size="sm">
                {images.length} {images.length === 1 ? 'image' : 'images'}
              </Tag>
            </Flex>

            <Flex alignItems="center" gap="sm" wrap="wrap">
              <UploadPrompt
                ref={addButton}
                isDropTarget={isDropTarget}
                error={error}
                acceptedTypes={acceptedTypes}
                onSelect={addFiles}
              />
              <SegmentedController aria-label="Layout" value={view} onSelectionChange={handleViewChange}>
                <SegmentedControllerItem value="list">
                  <Icon icon="bulleted-list" />
                  List
                </SegmentedControllerItem>
                <SegmentedControllerItem value="grid">
                  <Icon icon="grid" />
                  Grid
                </SegmentedControllerItem>
              </SegmentedController>
            </Flex>
          </Flex>

          {processing ? (
            <ProgressBar
              value={processing.completed}
              maxValue={processing.total}
              valueLabel={`${processing.completed} of ${processing.total} files processed`}
            >
              <Label>Processing images</Label>
              <Box slot="value" />
              <Box slot="track" />
            </ProgressBar>
          ) : null}

          <Detail role="status" aria-label="Gallery updates" aria-atomic="true" className={styles.notice}>
            {notice}
          </Detail>

          <Box role="region" aria-label={`${view === 'list' ? 'List' : 'Grid'} view`}>
            {images.length === 0 ? (
              <EmptyState />
            ) : view === 'list' ? (
              <ListView
                images={images}
                onOpen={handleOpenImage}
                onRemove={handleRemoveImage}
                onRetry={retryImage}
                onLoadError={handleImageLoadError}
                onLoadSuccess={markReady}
                preserveFocusActionId={failedOpenerId}
              />
            ) : (
              <GridView
                images={images}
                onOpen={handleOpenImage}
                onRemove={handleRemoveImage}
                onRetry={retryImage}
                onLoadError={handleImageLoadError}
                onLoadSuccess={markReady}
                preserveFocusActionId={failedOpenerId}
              />
            )}
          </Box>
        </Flex>
        {isDropTarget ? (
          <Flex
            role="status"
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="sm"
            padding="lg"
            className={styles.dropOverlay}
          >
            <Icon icon="upload" aria-hidden="true" />
            <Text as="strong">Drop files to upload.</Text>
          </Flex>
        ) : null}
      </Flex>
      <Viewer
        images={images.filter(function filterViewableImage(image) {
          return image.status !== 'error' && image.status !== 'loading';
        })}
        dir={dir}
        activeId={activeId}
        onClose={handleCloseViewer}
        onSelectImage={handleOpenImage}
      />
    </>
  );
}
