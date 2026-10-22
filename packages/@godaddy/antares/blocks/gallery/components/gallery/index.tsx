'use client';

import { forwardRef, useCallback, useId, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Detail,
  type DropEvent,
  type DropOptions,
  FileTrigger,
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
import type { GalleryLimits, ImageItem } from '../../data/types';
import { acceptedTypes, defaultLimits, useGalleryImages } from '../../hooks/use-gallery-images';
import { FileItems } from '../file-items';
import { Viewer } from '../viewer';
import styles from './index.module.css';

export interface GalleryProps {
  /** Initial images; read once on mount. Defaults to an empty gallery. IDs must be unique. */
  initialImages?: ImageItem[];

  /** Initial presentation; switching views preserves the collection. */
  defaultView?: 'list' | 'grid';

  /** Local ingestion budgets. Initial images are retained even when they exceed a budget. */
  limits?: GalleryLimits;

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
export function Gallery({ initialImages = [], defaultView = 'grid', limits, onImagesChange }: GalleryProps) {
  const resolvedLimits = {
    maxFiles: limits?.maxFiles ?? defaultLimits.maxFiles,
    maxFileSize: limits?.maxFileSize ?? defaultLimits.maxFileSize,
    maxTotalSize: limits?.maxTotalSize ?? defaultLimits.maxTotalSize
  };
  const {
    images,
    errors,
    notice,
    processing,
    addFiles,
    removeImage,
    retryImage,
    markReady,
    markError,
    reportError,
    dismissErrors
  } = useGalleryImages(initialImages, resolvedLimits, onImagesChange);
  const [view, setView] = useState(defaultView);
  const [showAll, setShowAll] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const uploadErrorId = useId();

  const handleShowAll = useCallback(function handleShowAll() {
    setShowAll(true);
  }, []);

  const handleRemoveImage = useCallback(
    function handleRemoveImage(image: ImageItem) {
      // The collection restores adjacent-row focus. The final removal unmounts it entirely.
      if (images.length === 1) addButton.current?.focus({ preventScroll: true });
      removeImage(image);
    },
    [images.length, removeImage]
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

  const handleImageLoadError = useCallback(
    function handleImageLoadError(id: string) {
      setActiveId((current) => (current === id ? null : current));
      markError(id);
    },
    [markError]
  );

  const handleCloseViewer = useCallback(function handleCloseViewer() {
    setActiveId(null);
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
        lang="en-US"
        role="region"
        aria-label="Add files to gallery"
        padding="0"
        alignItems="stretch"
        justifyContent="start"
        className={styles.dropZone}
      >
        <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
          <Flex gap="md" wrap="wrap" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="sm" wrap="wrap">
              <Heading level={2}>Gallery</Heading>
              <Tag size="sm">
                {images.length.toLocaleString('en-US')} {images.length === 1 ? 'image' : 'images'}
              </Tag>
            </Flex>

            <Flex alignItems="center" gap="sm" wrap="wrap">
              <UploadPrompt
                ref={addButton}
                isDropTarget={isDropTarget}
                errorId={errors.length ? uploadErrorId : undefined}
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

          {errors.length ? (
            <Alert
              id={uploadErrorId}
              emphasis="critical"
              aria-label="Upload issues"
              ariaLabels={{ close: 'Dismiss upload issues' }}
              onClose={function dismissUploadIssues() {
                addButton.current?.focus({ preventScroll: true });
                dismissErrors();
              }}
            >
              <Flex direction="column" gap="xs">
                {errors.map((error) => (
                  <Text key={error} size="sm">
                    {error}
                  </Text>
                ))}
              </Flex>
            </Alert>
          ) : null}
          <Detail role="status" aria-label="Gallery updates" aria-atomic="true" className={styles.notice}>
            {notice}
          </Detail>

          <Box
            ref={dropZoneRef}
            role="region"
            aria-label={view === 'list' ? 'List view' : 'Grid view'}
            {...dropProps}
            className={styles.dropTarget}
          >
            {images.length === 0 ? (
              <EmptyState />
            ) : (
              <FileItems
                view={view}
                images={images}
                showAll={showAll}
                onShowAll={handleShowAll}
                onOpen={setActiveId}
                onRemove={handleRemoveImage}
                onRetry={retryImage}
                onLoadError={handleImageLoadError}
                onLoadSuccess={markReady}
              />
            )}
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
          </Box>
          {processing ? (
            <ProgressBar
              value={processing.completed}
              maxValue={processing.total}
              valueLabel={`${processing.completed.toLocaleString('en-US')} of ${processing.total.toLocaleString('en-US')} files processed`}
            >
              <Label>Processing images</Label>
              <Box slot="value" />
              <Box slot="track" />
            </ProgressBar>
          ) : null}
        </Flex>
      </Flex>
      <Viewer
        images={images.filter(function filterViewableImage(image) {
          return image.status !== 'error' && image.status !== 'loading';
        })}
        activeId={activeId}
        onClose={handleCloseViewer}
        onSelectImage={setActiveId}
      />
    </>
  );
}

/** Welcomes users to an empty gallery and points them to the upload action. */
function EmptyState() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="sm"
      padding="2xl"
      role="region"
      aria-label="Empty gallery"
      className={styles.emptyState}
    >
      <Box padding="md" rounding="full" elevation="card" aria-hidden="true">
        <Icon icon="upload" />
      </Box>
      <Heading level={3}>Start your gallery</Heading>
      <Text className={styles.description}>Drop images here or choose Add files above to upload.</Text>
    </Flex>
  );
}

interface UploadPromptProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;

  /** Identifies current upload errors for the picker description. */
  errorId?: string;

  /** Adds files selected from the native picker. */
  onSelect: (files: FileList | null) => void;
}

/** Compact file-upload action shared by Gallery's list and grid views. */
const UploadPrompt = forwardRef<HTMLButtonElement, UploadPromptProps>(function UploadPrompt(
  { isDropTarget, errorId, onSelect },
  ref
) {
  const helpId = useId();
  const describedBy = [isDropTarget ? null : helpId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap" role="group" aria-label="Add files to gallery">
      <FileTrigger allowsMultiple acceptedFileTypes={acceptedTypes} onSelect={onSelect}>
        <Button
          ref={ref}
          type="button"
          size="md"
          variant="secondary"
          aria-label="Add files"
          aria-describedby={describedBy}
        >
          <Icon icon="upload" aria-hidden="true" />
          Add files
        </Button>
      </FileTrigger>
      {isDropTarget ? null : <Text id={helpId}>or drag images into the gallery below.</Text>}
    </Flex>
  );
});
