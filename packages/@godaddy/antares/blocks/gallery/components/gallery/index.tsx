'use client';

import { forwardRef, useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
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
import { GalleryCopyProvider, type GalleryMessages, useGalleryCopy } from '../../data/copy';
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

  /** Layout and viewer navigation direction. Match the host application's locale direction. Defaults to ltr. */
  dir?: 'ltr' | 'rtl';

  /** Notifies the host after collection or load-state changes. Blob URLs remain owned by this instance. */
  onImagesChange?: (images: ImageItem[]) => void;

  /** Locale used for file sizes and numeric feedback. Defaults to en-US. */
  locale?: string;

  /** Translated labels and announcements; omitted messages retain their English defaults. */
  messages?: Partial<GalleryMessages>;
}

/**
 * Copyable local gallery with shared list/grid state and a modal image viewer.
 * Files stay in this browser session. Replace ingestion/removal with your service integration
 * when persistence is needed; initialImages is read only on mount.
 *
 * @example
 * <Gallery initialImages={[{ id: 'cover', name: 'Cover.jpg', src: '/cover.jpg' }]} />
 */
export function Gallery({ locale = 'en-US', messages, dir = 'ltr', ...props }: GalleryProps) {
  return (
    <GalleryCopyProvider locale={locale} messages={messages}>
      <GalleryContent {...props} dir={dir} />
    </GalleryCopyProvider>
  );
}

/** Owns collection and presentation state within the gallery's locale scope. */
function GalleryContent({
  initialImages = [],
  defaultView = 'grid',
  limits,
  dir = 'ltr',
  onImagesChange
}: GalleryProps) {
  const { locale, messages } = useGalleryCopy();
  const resolvedLimits = {
    maxFiles: limits?.maxFiles ?? defaultLimits.maxFiles,
    maxFileSize: limits?.maxFileSize ?? defaultLimits.maxFileSize,
    maxTotalSize: limits?.maxTotalSize ?? defaultLimits.maxTotalSize
  };
  const { images, errors, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError } =
    useGalleryImages(initialImages, resolvedLimits, onImagesChange);
  const [view, setView] = useState(defaultView);
  const [showAll, setShowAll] = useState(false);
  const previousImages = useRef(images);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const uploadErrorId = useId();

  useLayoutEffect(
    function revealAddedImages() {
      const previousIds = new Set(previousImages.current.map((image) => image.id));
      const hasAddedImages = images.some((image) => !previousIds.has(image.id));
      previousImages.current = images;
      if (hasAddedImages) setShowAll(true);
    },
    [images]
  );

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
        reportError(messages.unreadableDrop);
      }
    },
    [addFiles, messages.unreadableDrop, reportError]
  );

  const handleViewChange = useCallback(function handleViewChange(key: string) {
    if (key === 'list' || key === 'grid') setView(key);
  }, []);

  const handleOpenImage = useCallback(function handleOpenImage(id: string) {
    setActiveId(id);
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
        dir={dir}
        lang={locale}
        role="region"
        aria-label={messages.addFilesRegion}
        padding="0"
        alignItems="stretch"
        justifyContent="start"
        className={styles.dropZone}
      >
        <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
          <Flex gap="md" wrap="wrap" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="sm" wrap="wrap">
              <Heading level={2}>{messages.gallery}</Heading>
              <Tag size="sm">{messages.imageCount(images.length)}</Tag>
            </Flex>

            <Flex alignItems="center" gap="sm" wrap="wrap">
              <UploadPrompt
                ref={addButton}
                isDropTarget={isDropTarget}
                errorId={errors.length ? uploadErrorId : undefined}
                acceptedTypes={acceptedTypes}
                onSelect={addFiles}
              />
              <SegmentedController aria-label={messages.layout} value={view} onSelectionChange={handleViewChange}>
                <SegmentedControllerItem value="list">
                  <Icon icon="bulleted-list" />
                  {messages.list}
                </SegmentedControllerItem>
                <SegmentedControllerItem value="grid">
                  <Icon icon="grid" />
                  {messages.grid}
                </SegmentedControllerItem>
              </SegmentedController>
            </Flex>
          </Flex>

          {errors.length ? (
            <Alert id={uploadErrorId} emphasis="critical" title={messages.uploadIssues}>
              <Flex direction="column" gap="xs">
                {errors.map((error) => (
                  <Text key={error}>{error}</Text>
                ))}
              </Flex>
            </Alert>
          ) : null}
          <Detail role="status" aria-label={messages.updates} aria-atomic="true" className={styles.notice}>
            {notice}
          </Detail>

          <Box
            ref={dropZoneRef}
            role="region"
            aria-label={view === 'list' ? messages.listView : messages.gridView}
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
                onOpen={handleOpenImage}
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
                <Text as="strong">{messages.dropFiles}</Text>
              </Flex>
            ) : null}
          </Box>
          {processing ? (
            <ProgressBar
              value={processing.completed}
              maxValue={processing.total}
              valueLabel={messages.processedFiles(processing.completed, processing.total)}
            >
              <Label>{messages.processingImages}</Label>
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
        dir={dir}
        activeId={activeId}
        onClose={handleCloseViewer}
        onSelectImage={handleOpenImage}
      />
    </>
  );
}

/** Welcomes users to an empty gallery and points them to the upload action. */
function EmptyState() {
  const { messages } = useGalleryCopy();
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="sm"
      padding="2xl"
      role="region"
      aria-label={messages.emptyGallery}
      className={styles.emptyState}
    >
      <Box padding="md" rounding="full" elevation="card" aria-hidden="true">
        <Icon icon="upload" />
      </Box>
      <Heading level={3}>{messages.startGallery}</Heading>
      <Text className={styles.description}>{messages.emptyDescription}</Text>
    </Flex>
  );
}

interface UploadPromptProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;

  /** Identifies current upload errors for the picker description. */
  errorId?: string;

  /** MIME types accepted by the gallery picker. */
  acceptedTypes: string[];

  /** Adds files selected from the native picker. */
  onSelect: (files: FileList | null) => void;
}

/** Compact file-upload action shared by Gallery's list and grid views. */
const UploadPrompt = forwardRef<HTMLButtonElement, UploadPromptProps>(function UploadPrompt(
  { isDropTarget, errorId, acceptedTypes, onSelect },
  ref
) {
  const { messages } = useGalleryCopy();
  const helpId = useId();
  const describedBy = [isDropTarget ? null : helpId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap" role="group" aria-label={messages.addFilesRegion}>
      <FileTrigger allowsMultiple acceptedFileTypes={acceptedTypes} onSelect={onSelect}>
        <Button
          ref={ref}
          type="button"
          size="md"
          variant="secondary"
          aria-label={messages.addFiles}
          aria-describedby={describedBy}
        >
          <Icon icon="upload" aria-hidden="true" />
          {messages.addFiles}
        </Button>
      </FileTrigger>
      {isDropTarget ? null : <Text id={helpId}>{messages.dragHint}</Text>}
    </Flex>
  );
});
