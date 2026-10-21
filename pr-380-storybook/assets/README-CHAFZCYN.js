import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,l as i,s as a,u as o}from"./blocks-DupWEMCh.js";import{n as s}from"./runtime-CrhuJ8bq.js";import{n as c,t as l}from"./storybook-runtime-m8v_97_C.js";import{n as u,r as d,t as f}from"./gallery.stories-CJQjnUep.js";function p(e){let t={h1:`h1`,p:`p`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:u,name:`Overview`,id:`blocks-gallery`}),`
`,(0,h.jsx)(t.h1,{id:`gallery`,children:`Gallery`}),`
`,(0,h.jsx)(t.p,{children:`Browse images in a list or grid, add local files, and open a media viewer.`}),`
`,(0,h.jsx)(l,{block:{id:`gallery`,description:`Browse images in a list or grid, add local files, and open a media viewer.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/gallery`,files:[{path:`components/empty-state/index.module.css`,language:`css`,source:`.emptyState {
  min-block-size: 256px;
  text-align: center;
}

.description {
  max-inline-size: 30rem;
}
`},{path:`components/empty-state/index.tsx`,language:`tsx`,source:`import { Box, Flex, Heading, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

/** Welcomes users to an empty gallery and points them to the upload action. */
export function EmptyState() {
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
`},{path:`components/file-cover/index.module.css`,language:`css`,source:`.surface {
  max-inline-size: 100%;
  object-fit: cover;
}

.surface:where(img) {
  display: block;
}

.surface:where([data-variant="horizontal"]) {
  inline-size: 56px;
  block-size: 56px;
}

.surface:where([data-variant="vertical"]) {
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 1;
}

.error {
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/file-cover/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from '../image/image-surface';
import surfaceStyles from '../image/image-surface.module.css';
import styles from './index.module.css';

/** Cover geometry used by Gallery's list and grid presentations. */
export type FileCoverVariant = 'horizontal' | 'vertical';

interface FileCoverProps {
  /** File represented by the cover. */
  image: ImageItem;

  /** Cover geometry used by the parent presentation. */
  variant: FileCoverVariant;

  /** Opens a successful image in the viewer. */
  onOpen?: (id: string) => void;

  /** Reports an image decode or network failure to the owning gallery. */
  onLoadError?: (id: string) => void;

  /** Reports a successful retry to the owning gallery. */
  onLoadSuccess?: (id: string) => void;

  /** Retries a failed image when the stable cover action has focus. */
  onRetry?: () => void;

  /** Keeps the active viewer's opener mounted if that same file fails. */
  preserveErrorAction?: boolean;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({
  image,
  variant,
  onOpen,
  onLoadError,
  onLoadSuccess,
  onRetry,
  preserveErrorAction = false
}: FileCoverProps) {
  const [failedThumbnail, setFailedThumbnail] = useState<string | null>(null);
  const wasReady = useRef(false);
  const thumbnail = image.thumbnailSrc && failedThumbnail !== image.thumbnailSrc ? image.thumbnailSrc : undefined;
  const reportLoadError = useCallback(
    function reportLoadError() {
      if (thumbnail && thumbnail !== image.src) setFailedThumbnail(thumbnail);
      else onLoadError?.(image.id);
    },
    [thumbnail, image.src, image.id, onLoadError]
  );
  const reportLoadSuccess = useCallback(
    function reportLoadSuccess() {
      wasReady.current = true;
      onLoadSuccess?.(image.id);
    },
    [image.id, onLoadSuccess]
  );
  const { state, imageRef, onLoad, onError } = useImageLoadState(thumbnail ?? image.src, {
    resetKey: \`\${image.id}:\${image.status ?? ''}\`,
    onLoad: reportLoadSuccess,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';
  const canRetry = preserveErrorAction && hasError && !!onRetry;
  const keepOpenAction = !!onOpen && (state === 'ready' || wasReady.current);
  const isLoading = !hasError && state !== 'ready';
  const handlePress = useCallback(
    function handleCoverAction() {
      if (canRetry) onRetry?.();
      else if (!isLoading) onOpen?.(image.id);
    },
    [canRetry, image.id, isLoading, onOpen, onRetry]
  );

  const cover = hasError ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      role="img"
      aria-label={\`\${image.name}: \${image.errorMessage ?? 'File needs attention.'}\`}
      rounding="md"
      className={\`\${styles.surface} \${styles.error}\`}
      data-variant={variant}
    >
      <Icon icon="alert" aria-hidden="true" />
    </Flex>
  ) : (
    <ImageSurface
      ref={imageRef}
      src={thumbnail ?? image.src}
      srcSet={thumbnail ? undefined : image.srcSet}
      sizes={thumbnail ? undefined : image.sizes}
      width={thumbnail ? undefined : image.width}
      height={thumbnail ? undefined : image.height}
      alt={keepOpenAction ? '' : (image.alt ?? image.name)}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
    />
  );

  if (keepOpenAction || canRetry) {
    return (
      <Button
        variant="minimal"
        aria-label={
          canRetry
            ? \`Retry image preview for \${image.name}\`
            : isLoading
              ? \`Loading \${image.name}\`
              : \`Open \${image.name}\`
        }
        aria-disabled={isLoading || undefined}
        onPress={handlePress}
        className={surfaceStyles.openButton}
      >
        {cover}
      </Button>
    );
  }

  return cover;
}
`},{path:`components/file-item/index.module.css`,language:`css`,source:`.item {
  inline-size: 100%;
  min-inline-size: 0;
}

.card {
  --_gallery-file-action-space: calc(var(--size-space-080, calc(var(--ux-1sbfig8, 0.25rem) * 5)) * 2);
}

.card:where([data-error]) {
  border-color: var(--color-feedback-critical-strong, var(--ux-1fhc073, #db1802));
}

.details {
  min-inline-size: 0;
  padding-inline-end: var(--_gallery-file-action-space);
}

.details:where([data-variant="vertical"]) {
  padding-inline-end: 0;
}

.errorDetails {
  min-inline-size: 0;
}
`},{path:`components/file-item/index.tsx`,language:`tsx`,source:`'use client';

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

  /** Keeps this file's cover action mounted when it is the active viewer opener. */
  preserveFocusAction?: boolean;
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
export function FileItem({
  image,
  variant,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess,
  preserveFocusAction = false
}: FileItemProps) {
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
            onRetry={handleRetry}
            preserveErrorAction={preserveFocusAction}
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
              <Button
                data-gallery-retry=""
                variant="inline"
                size="sm"
                aria-label={\`Retry \${image.name}\`}
                onPress={handleRetry}
              >
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
            aria-label={\`Remove \${image.name}\`}
            onPress={() => onRemove(image)}
          >
            <Icon icon="x" aria-hidden="true" />
          </Button>
        </CornerActions>
      </Card>
    </Box>
  );
}
`},{path:`components/file-items/index.tsx`,language:`tsx`,source:`'use client';

import { FileItem, type FileItemProps } from '../file-item';
import type { ImageItem } from '../../data/types';

interface FileItemsProps
  extends Pick<FileItemProps, 'onOpen' | 'onRemove' | 'onRetry' | 'onLoadError' | 'onLoadSuccess'> {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Layout variant shared by every item in the collection. */
  variant: FileItemProps['variant'];

  /** Keeps the viewer opener mounted if that same file fails. */
  preserveFocusActionId?: string | null;
}

/** Shared collection renderer used by the list and grid layouts. */
export function FileItems({
  images,
  variant,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess,
  preserveFocusActionId
}: FileItemsProps) {
  return images.map(function renderFileItem(image) {
    return (
      <FileItem
        key={image.id}
        image={image}
        variant={variant}
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
        preserveFocusAction={image.id === preserveFocusActionId}
      />
    );
  });
}
`},{path:`components/gallery/index.module.css`,language:`css`,source:`.content {
  inline-size: 100%;
  min-inline-size: 0;
}

/* Keep the live region mounted without reserving a gap before the first update. */
.notice:where(:empty) {
  position: absolute;
}

.dropOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 1px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: var(--ux-2jubes, 16px);
  background-color: rgba(216, 239, 239, 0.9);
  color: var(--color-surface-text-base, var(--ux-1leynsm, #111));
  pointer-events: none;
}

.dropZone {
  position: relative;
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 80rem;
  min-inline-size: 0;
  margin-inline: auto;
}
`},{path:`components/gallery/index.tsx`,language:`tsx`,source:`'use client';

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
              valueLabel={\`\${processing.completed} of \${processing.total} files processed\`}
            >
              <Label>Processing images</Label>
              <Box slot="value" />
              <Box slot="track" />
            </ProgressBar>
          ) : null}

          <Detail role="status" aria-label="Gallery updates" aria-atomic="true" className={styles.notice}>
            {notice}
          </Detail>

          <Box role="region" aria-label={\`\${view === 'list' ? 'List' : 'Grid'} view\`}>
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
`},{path:`components/grid-view/index.module.css`,language:`css`,source:`.items {
  inline-size: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/grid-view/index.tsx`,language:`tsx`,source:`'use client';

import { Grid } from '@godaddy/antares';
import { FileItems } from '../file-items';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

interface GridViewProps {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Opens the media viewer. */
  onOpen: (id: string) => void;

  /** Removes an image from the collection. */
  onRemove: (image: ImageItem) => void;

  /** Retries a failed upload. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;

  /** Keeps the viewer opener mounted if that same file fails. */
  preserveFocusActionId?: string | null;
}

/** Cards keep a consistent preview size, including small collections. */
export function GridView({
  images,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess,
  preserveFocusActionId
}: GridViewProps) {
  return (
    <Grid
      as="ul"
      columns="repeat(auto-fill, minmax(min(100%, 240px), 1fr))"
      gap="sm"
      justifyContent="start"
      alignItems="start"
      aria-label="Gallery image grid"
      className={styles.items}
    >
      <FileItems
        images={images}
        variant="vertical"
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
        preserveFocusActionId={preserveFocusActionId}
      />
    </Grid>
  );
}
`},{path:`components/image/image-surface.module.css`,language:`css`,source:`.openButton {
  display: block;
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0;
}
`},{path:`components/image/image-surface.tsx`,language:`tsx`,source:`'use client';

import { forwardRef, useCallback, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, type ButtonProps, Image } from '@godaddy/antares';
import styles from './image-surface.module.css';

type ImageLoadState = 'loading' | 'ready' | 'error';

interface UseImageLoadStateOptions {
  /** Resets the resource when the owning image changes state. */
  resetKey?: string;

  /** Called after the image loads successfully. */
  onLoad?: () => void;

  /** Called after the image fails to load. */
  onError?: () => void;
}

/**
 * Shares image loading and retry across covers, slides, and thumbnails.
 * The ref inspects cached images whose native load event may precede React's handlers.
 * Report each outcome once per resource/attempt: callback refs also run when handlers change.
 */
export function useImageLoadState(
  src: string,
  { resetKey = '', onLoad: reportLoad, onError: reportError }: UseImageLoadStateOptions = {}
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');
  const reportedErrorKey = useRef<string | null>(null);
  const reportedLoadKey = useRef<string | null>(null);
  const resourceKey = JSON.stringify([src, resetKey]);
  const previousResourceKey = useRef(resourceKey);

  if (previousResourceKey.current !== resourceKey) {
    previousResourceKey.current = resourceKey;
    reportedErrorKey.current = null;
    reportedLoadKey.current = null;
    // Reset before the image ref inspects a resource that may already be complete.
    setAttempt(0);
    setState('loading');
  }

  const loadKey = \`\${resourceKey}:\${attempt}\`;

  const reportLoadOnce = useCallback(
    function reportLoadedResource() {
      if (reportedLoadKey.current === loadKey) return;

      reportedLoadKey.current = loadKey;
      reportLoad?.();
    },
    [loadKey, reportLoad]
  );

  const reportErrorOnce = useCallback(
    function reportFailedResource() {
      if (reportedErrorKey.current === loadKey) return;

      reportedErrorKey.current = loadKey;
      reportError?.();
    },
    [loadKey, reportError]
  );

  const imageRef = useCallback(
    function inspectLoadedImage(element: HTMLImageElement | null) {
      if (!element?.complete) return;

      if (element.naturalWidth > 0) {
        setState('ready');
        reportLoadOnce();
      } else {
        setState('error');
        reportErrorOnce();
      }
    },
    [reportErrorOnce, reportLoadOnce]
  );

  const onLoad = useCallback(
    function handleLoad() {
      setState('ready');
      reportLoadOnce();
    },
    [reportLoadOnce]
  );

  const onError = useCallback(
    function handleError() {
      setState('error');
      reportErrorOnce();
    },
    [reportErrorOnce]
  );

  const retry = useCallback(function retryImage() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);

  return { attempt, imageRef, onLoad, onError, retry, src, state };
}

interface ImageSurfaceProps {
  /** Resource to display. */
  src: string;

  /** Responsive candidates for the displayed resource. */
  srcSet?: string;

  /** Sizes corresponding to responsive candidates. */
  sizes?: string;

  /** Intrinsic width, when known. */
  width?: number;

  /** Intrinsic height, when known. */
  height?: number;

  /** Keyboard position for an interactive thumbnail. */
  tabIndex?: number;

  /** Keyboard navigation supplied by the viewer. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;

  /** Image name; decorative inside a separately named action. */
  alt: string;

  /** Presentation variant consumed by the caller's stylesheet. */
  variant?: string;

  /** Styles owned by the calling cover, slide, or thumbnail. */
  className?: string;

  /** Prioritize the active slide; defer offscreen resources. */
  loading?: 'eager' | 'lazy';

  /** Native successful decode notification. */
  onLoad?: ReactEventHandler<HTMLImageElement>;

  /** Native decode or network error notification. */
  onError?: ReactEventHandler<HTMLImageElement>;

  /** Optional activation wrapper for a viewable image. */
  onOpen?: () => void;

  /** Name of the image action, including its filename. */
  label?: string;

  /** Marks the active thumbnail without introducing selection semantics. */
  selected?: boolean;
}

/** Renders the shared image element and optional accessible action wrapper. */
export const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  {
    src,
    srcSet,
    sizes,
    width,
    height,
    alt,
    variant,
    className,
    loading = 'lazy',
    onLoad,
    onError,
    onOpen,
    label,
    selected,
    tabIndex,
    onKeyDown
  },
  ref
) {
  const image = (
    <Box
      as={Image}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={onOpen ? '' : alt}
      className={className}
      data-variant={variant}
      rounding="md"
      loading={loading}
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  );

  if (!onOpen) return image;

  return (
    <Button
      variant={selected ? 'secondary' : 'minimal'}
      aria-label={label ?? \`Open \${alt}\`}
      aria-current={selected ? 'true' : undefined}
      onPress={onOpen}
      excludeFromTabOrder={tabIndex === -1}
      onKeyDown={onKeyDown}
      className={styles.openButton}
    >
      {image}
    </Button>
  );
});
`},{path:`components/image/index.module.css`,language:`css`,source:`.image {
  max-inline-size: 100%;
}

.image:where(img) {
  display: block;
}

.image:where([data-variant="viewer"]) {
  inline-size: 100%;
  max-block-size: 55dvh;
  object-fit: contain;
}

.image:where([data-variant="thumbnail"]) {
  inline-size: 80px;
  block-size: 60px;
  object-fit: cover;
}

.container {
  min-inline-size: 0;
}

.errorSurface {
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/image/index.tsx`,language:`tsx`,source:`'use client';

import { Button, type ButtonProps, Flex, Icon, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from './image-surface';
import styles from './index.module.css';
import surfaceStyles from './image-surface.module.css';

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

  /** Keyboard position in the thumbnail rail. */
  tabIndex?: number;

  /** Handles thumbnail keyboard navigation. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({
  image,
  variant = 'default',
  onOpen,
  label,
  selected,
  loading = 'lazy',
  tabIndex,
  onKeyDown
}: GalleryImageProps) {
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(
    variant === 'thumbnail' ? (image.thumbnailSrc ?? image.src) : image.src,
    {
      resetKey: image.id
    }
  );

  if (state === 'error' && variant !== 'thumbnail') {
    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">Couldn’t load {image.name}.</Text>
        <Button variant="inline" aria-label={\`Retry \${image.name}\`} onPress={retry}>
          Retry
        </Button>
      </Flex>
    );
  }

  const picture =
    state === 'error' ? (
      <Flex
        alignItems="center"
        justifyContent="center"
        className={\`\${styles.image} \${styles.errorSurface}\`}
        data-variant={variant}
        role="img"
        aria-label={\`\${image.name} failed to load\`}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    ) : (
      <ImageSurface
        ref={imageRef}
        key={attempt}
        src={src}
        alt={variant === 'thumbnail' && onOpen ? '' : (image.alt ?? image.name)}
        srcSet={variant === 'thumbnail' ? undefined : image.srcSet}
        sizes={variant === 'thumbnail' ? undefined : image.sizes}
        width={variant === 'thumbnail' ? 80 : image.width}
        height={variant === 'thumbnail' ? 60 : image.height}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        className={styles.image}
        variant={variant}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        onOpen={variant !== 'thumbnail' && onOpen ? () => onOpen(image.id) : undefined}
        label={label ?? \`View \${image.name}\`}
        selected={selected}
      />
    );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {variant === 'thumbnail' && onOpen ? (
        <Button
          variant={selected ? 'secondary' : 'minimal'}
          aria-label={label ?? \`View \${image.name}\`}
          excludeFromTabOrder={tabIndex === -1}
          onKeyDown={onKeyDown}
          aria-current={selected ? 'true' : undefined}
          onPress={() => onOpen(image.id)}
          className={surfaceStyles.openButton}
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
`},{path:`components/list-view/index.module.css`,language:`css`,source:`.root {
  inline-size: 100%;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/list-view/index.tsx`,language:`tsx`,source:`'use client';

import { useEffect, useRef, useState } from 'react';
import { Flex } from '@godaddy/antares';
import { FileItems } from '../file-items';
import { ViewBanner } from '../view-banner';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

interface ListViewProps {
  /** Images to render in source order. */
  images: ImageItem[];

  /** Opens the media viewer. */
  onOpen: (id: string) => void;

  /** Removes an image from the collection. */
  onRemove: (image: ImageItem) => void;

  /** Retries a failed image. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;

  /** Keeps the viewer opener mounted if that same file fails. */
  preserveFocusActionId?: string | null;
}

const MAX_VISIBLE_ITEMS = 5;

/** Horizontal file list with counter and error banner. */
export function ListView({
  images,
  onOpen,
  onRemove,
  onRetry,
  onLoadError,
  onLoadSuccess,
  preserveFocusActionId
}: ListViewProps) {
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const firstRevealedIndex = useRef<number | null>(null);
  const visibleImages = showAll ? images : images.slice(0, MAX_VISIBLE_ITEMS);
  const errorCount = images.filter(function countError(image) {
    return image.status === 'error';
  }).length;

  useEffect(
    function focusRevealedFile() {
      const index = firstRevealedIndex.current;
      if (index === null) return;

      firstRevealedIndex.current = null;
      const item = listRef.current?.children[index];
      item?.querySelector<HTMLButtonElement>('button')?.focus();
    },
    [showAll]
  );

  function handleShowAll() {
    firstRevealedIndex.current = visibleImages.length;
    setShowAll(true);
  }

  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex as="ul" ref={listRef} direction="column" gap="sm" aria-label="Gallery files" className={styles.items}>
        <FileItems
          images={visibleImages}
          variant="horizontal"
          onOpen={onOpen}
          onRemove={onRemove}
          onRetry={onRetry}
          onLoadError={onLoadError}
          onLoadSuccess={onLoadSuccess}
          preserveFocusActionId={preserveFocusActionId}
        />
      </Flex>
      <ViewBanner
        visibleCount={visibleImages.length}
        totalCount={images.length}
        errorCount={errorCount}
        onShowAll={handleShowAll}
      />
    </Flex>
  );
}
`},{path:`components/upload-prompt/index.tsx`,language:`tsx`,source:`'use client';

import { forwardRef, useId } from 'react';
import { Button, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';

interface UploadPromptProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;

  /** Validation message shared with the picker and drop target. */
  error: string;

  /** MIME types accepted by the gallery picker. */
  acceptedTypes: string[];

  /** Adds files selected from the native picker. */
  onSelect: (files: FileList | null) => void;
}

/** Compact file-upload action shared by Gallery's list and grid views. */
export const UploadPrompt = forwardRef<HTMLButtonElement, UploadPromptProps>(function UploadPrompt(
  { isDropTarget, error, acceptedTypes, onSelect },
  ref
) {
  const helpId = useId();
  const errorId = useId();
  const describedBy = [isDropTarget ? null : helpId, error ? errorId : null].filter(Boolean).join(' ') || undefined;
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
      {isDropTarget ? null : <Text id={helpId}>or drag them here.</Text>}
      {error ? (
        <Text id={errorId} role="alert" emphasis="critical">
          {error}
        </Text>
      ) : null}
    </Flex>
  );
});
`},{path:`components/view-banner/index.tsx`,language:`tsx`,source:`'use client';

import { Button, Flex, Icon, Text } from '@godaddy/antares';

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
export function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm">
      <Flex justifyContent="space-between" alignItems="center" gap="sm">
        <Text>
          {visibleCount} of {totalCount} files
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
            {errorCount} file{errorCount === 1 ? ' needs' : 's need'} attention.
          </Text>
        </Flex>
      ) : null}
    </Flex>
  );
}
`},{path:`components/viewer/index.module.css`,language:`css`,source:`.modal {
  inline-size: 100%;
  max-inline-size: 60rem;
}

.slide {
  min-inline-size: 0;
  max-inline-size: 100%;
}

.name {
  overflow-wrap: anywhere;
}

.thumbnails {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  list-style: none;
}
`},{path:`components/viewer/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Button, Carousel, Box, CloseButton, Content, Flex, Heading, Icon, Modal, Text } from '@godaddy/antares';
import { GalleryImage } from '../image';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

type PropagatingKeyboardEvent<T extends Element> = ReactKeyboardEvent<T> & {
  continuePropagation(): void;
};

interface ViewerProps {
  /** Shared direction for layout, keyboard navigation, and carousel gestures. */
  dir: 'ltr' | 'rtl';

  /** Current viewable gallery order, shared by the list and grid views. */
  images: ImageItem[];

  /** Stable image ID, or null while the viewer is closed. */
  activeId: string | null;

  /** Closes the viewer. */
  onClose: () => void;

  /** Selects an image from the viewer controls or thumbnail rail. */
  onSelectImage: (id: string) => void;
}

/** Modal image viewer that reuses Antares Carousel for the main image sequence. */
export function Viewer({ dir, images, activeId, onClose, onSelectImage }: ViewerProps) {
  const strip = useRef<HTMLUListElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const focusCurrentThumbnail = useRef(false);
  const index = images.findIndex(function findActiveImage(image) {
    return image.id === activeId;
  });
  const image = images[index];

  useEffect(
    function revealCurrentThumbnail() {
      const thumbnail = strip.current?.querySelector<HTMLButtonElement>('[aria-current="true"]');
      thumbnail?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      if (focusCurrentThumbnail.current) {
        (thumbnail ?? closeButton.current)?.focus();
        focusCurrentThumbnail.current = false;
      }
    },
    [activeId]
  );

  const move = useCallback(
    function move(offset: number) {
      const nextImage = images[index + offset];
      if (!nextImage) return;

      // Boundary controls become disabled; focus the current thumbnail before continuing by Tab.
      focusCurrentThumbnail.current =
        focusCurrentThumbnail.current ||
        (document.activeElement === previousButton.current && index + offset === 0) ||
        (document.activeElement === nextButton.current && index + offset === images.length - 1);
      onSelectImage(nextImage.id);
    },
    [images, index, onSelectImage]
  );

  const navigate = useCallback(
    function navigate(event: ReactKeyboardEvent<HTMLElement>) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        focusCurrentThumbnail.current = !!strip.current?.contains(document.activeElement);
        if (event.key === 'Home') move(-index);
        else if (event.key === 'End') move(images.length - 1 - index);
        else move((event.key === 'ArrowLeft' ? -1 : 1) * (dir === 'rtl' ? -1 : 1));
      }
    },
    [dir, images.length, index, move]
  );

  const handleCloseKeyDown = useCallback(
    function handleCloseKeyDown(event: PropagatingKeyboardEvent<HTMLButtonElement>) {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) navigate(event);
      else event.continuePropagation();
    },
    [navigate]
  );

  const handleOpenChange = useCallback(
    function handleOpenChange(open: boolean) {
      if (!open) onClose();
    },
    [onClose]
  );

  const handlePrevious = useCallback(
    function handlePrevious() {
      move(-1);
    },
    [move]
  );

  const handleNext = useCallback(
    function handleNext() {
      move(1);
    },
    [move]
  );

  const handleCarouselChange = useCallback(
    function handleCarouselChange(nextIndex: number) {
      const nextImage = images[nextIndex];
      if (nextImage && nextImage.id !== activeId) onSelectImage(nextImage.id);
    },
    [activeId, images, onSelectImage]
  );

  const renderSlide = useCallback(
    function renderSlide(slideImage: ImageItem, slideIndex: number) {
      return (
        <Flex key={slideImage.id} alignItems="center" justifyContent="center" className={styles.slide}>
          {Math.abs(slideIndex - index) <= 1 ? (
            <GalleryImage image={slideImage} variant="viewer" loading={slideImage.id === activeId ? 'eager' : 'lazy'} />
          ) : (
            <Box aria-hidden="true" />
          )}
        </Flex>
      );
    },
    [activeId, index]
  );

  const renderThumbnail = useCallback(
    function renderThumbnail(thumbnailImage: ImageItem) {
      return (
        <Flex as="li" key={thumbnailImage.id} flexShrink={0}>
          <GalleryImage
            image={thumbnailImage}
            variant="thumbnail"
            selected={thumbnailImage.id === activeId}
            label={\`View \${thumbnailImage.name}\`}
            tabIndex={thumbnailImage.id === activeId ? 0 : -1}
            onKeyDown={handleCloseKeyDown}
            onOpen={onSelectImage}
          />
        </Flex>
      );
    },
    [activeId, handleCloseKeyDown, onSelectImage]
  );

  if (!image) return null;

  return (
    <Modal isOpen dir={dir} aria-label="Media gallery" onOpenChange={handleOpenChange} className={styles.modal}>
      <Heading slot="title" level={2}>
        Media gallery
      </Heading>
      <CloseButton ref={closeButton} aria-label="Close gallery" onKeyDown={handleCloseKeyDown} />
      <Content onKeyDown={navigate}>
        <Carousel
          activeIndex={index}
          onChange={handleCarouselChange}
          hideDots
          hideNavigationControls
          hideMaskEdges
          emblaOptions={{ direction: dir }}
          emblaAccessibilityOptions={{ carouselAriaLabel: 'Gallery images', announceChanges: false }}
        >
          {images.map(renderSlide)}
        </Carousel>
        <Flex justifyContent="space-between" alignItems="center" gap="sm" wrap="wrap">
          <Text className={styles.name} role="status" aria-atomic="true">
            {image.name} · {index + 1} of {images.length}
          </Text>
          <Flex gap="xs" alignItems="center">
            <Button
              ref={previousButton}
              onKeyDown={handleCloseKeyDown}
              variant="secondary"
              aria-label="Previous image"
              isDisabled={index === 0}
              onPress={handlePrevious}
            >
              <Icon icon={dir === 'rtl' ? 'chevron-right' : 'chevron-left'} aria-hidden="true" />
            </Button>
            <Button
              ref={nextButton}
              onKeyDown={handleCloseKeyDown}
              variant="secondary"
              aria-label="Next image"
              isDisabled={index === images.length - 1}
              onPress={handleNext}
            >
              <Icon icon={dir === 'rtl' ? 'chevron-left' : 'chevron-right'} aria-hidden="true" />
            </Button>
          </Flex>
        </Flex>
        <Flex as="ul" ref={strip} gap="sm" aria-label="Image thumbnails" className={styles.thumbnails}>
          {images.map(renderThumbnail)}
        </Flex>
      </Content>
    </Modal>
  );
}
`},{path:`data/sample-images.ts`,language:`ts`,source:`import type { ImageItem } from './types';

/** Fixed IDs keep the sample photographs consistent between visits. */
const photographs: ImageItem[] = [
  {
    id: 'sample-1015',
    name: 'file_name.png',
    alt: 'Blue fjord between rocky mountains',
    src: 'https://picsum.photos/id/1015/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1016',
    name: 'Photo_2.png',
    alt: 'Red sandstone mesas beneath a cloudy sky',
    src: 'https://picsum.photos/id/1016/960/640',
    size: 2 * 1024 * 1024
  },
  {
    id: 'sample-1018',
    name: 'Photo_3.png',
    alt: 'Winding road beneath grass-covered cliffs',
    src: 'https://picsum.photos/id/1018/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1025',
    name: 'Photo_4.png',
    alt: 'Pug wrapped in a blanket',
    src: 'https://picsum.photos/id/1025/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-1035',
    name: 'Photo_5.png',
    alt: 'Waterfall flowing over a rocky cliff',
    src: 'https://picsum.photos/id/1035/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1043',
    name: 'Photo_6.png',
    alt: 'Granite cliffs above a river and pine forest',
    src: 'https://picsum.photos/id/1043/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1050',
    name: 'Photo_7.png',
    alt: 'White sea stacks along a rugged coast',
    src: 'https://picsum.photos/id/1050/960/640',
    size: 5 * 1024 * 1024
  },
  {
    id: 'sample-1069',
    name: 'Photo_8.png',
    alt: 'Jellyfish in dark blue water',
    src: 'https://picsum.photos/id/1069/960/640',
    size: 3 * 1024 * 1024
  },
  {
    id: 'sample-1068',
    name: 'Photo_9.png',
    alt: 'Potted plant and glass jar on a table against a blue wall',
    src: 'https://picsum.photos/id/1068/960/640',
    size: 4 * 1024 * 1024
  },
  {
    id: 'sample-1074',
    name: 'Photo_10.png',
    alt: 'Close-up of a lioness against a dark background',
    src: 'https://picsum.photos/id/1074/960/640',
    size: 6 * 1024 * 1024
  },
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    alt: 'Landscape photograph that could not be loaded',
    src: 'https://picsum.photos/id/1084/960/640',
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];

/** Small previews and responsive originals illustrate an image-service integration. */
export const sampleImages: ImageItem[] = photographs.map((image) => ({
  ...image,
  thumbnailSrc: image.src.replace('/960/640', '/240/160'),
  width: 960,
  height: 640,
  srcSet: \`\${image.src.replace('/960/640', '/480/320')} 480w, \${image.src} 960w\`,
  sizes: '(max-width: 60rem) 90vw, 960px'
}));
`},{path:`data/types.ts`,language:`ts`,source:`/** The load state shown by a gallery file item. */
type ImageStatus = 'ready' | 'loading' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible action name. */
  name: string;

  /** Description of the visual content. Falls back to the filename for file-management use cases. */
  alt?: string;

  /** Remote URL, data URL, or locally owned object URL for the full image. */
  src: string;

  /** Smaller resource for covers and the thumbnail rail; defaults to src. */
  thumbnailSrc?: string;

  /** Responsive full-image candidates supplied by the image service. */
  srcSet?: string;

  /** Display sizes corresponding to srcSet. */
  sizes?: string;

  /** Intrinsic full-image width, when known. */
  width?: number;

  /** Intrinsic full-image height, when known. */
  height?: number;

  /** Actual bytes when known; unknown remote sizes are excluded from the byte budget. */
  size?: number;

  /** Current image load state. */
  status?: ImageStatus;

  /** Optional message associated with an image error. */
  errorMessage?: string;
}

/** Local collection budgets. Initial images count toward these limits but are never discarded. */
export interface GalleryLimits {
  /** Maximum collection size, including initial images. Defaults to 50. */
  maxFiles?: number;

  /** Exclusive per-file byte limit. Defaults to 256 MiB. */
  maxFileSize?: number;

  /** Inclusive total byte budget for images with a known size. Defaults to 256 MiB. */
  maxTotalSize?: number;
}
`},{path:`examples/empty.tsx`,language:`tsx`,source:`import { Gallery } from '../index';

export function EmptyGalleryExample() {
  return <Gallery />;
}
`},{path:`examples/grid.tsx`,language:`tsx`,source:`import { Gallery } from '../index';
import { sampleImages } from '../data/sample-images';

export function GridGalleryExample() {
  return <Gallery initialImages={sampleImages} defaultView="grid" />;
}
`},{path:`examples/list.tsx`,language:`tsx`,source:`import { Gallery } from '../index';
import { sampleImages } from '../data/sample-images';

export function ListGalleryExample() {
  return <Gallery initialImages={sampleImages} defaultView="list" />;
}
`},{path:`hooks/use-gallery-images.ts`,language:`ts`,source:`'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { GalleryLimits, ImageItem } from '../data/types';

export const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MiB = 1024 * 1024;
export const defaultLimits: Required<GalleryLimits> = { maxFiles: 50, maxFileSize: 256 * MiB, maxTotalSize: 256 * MiB };

/** Hashing is optional; an unreadable file still fails independently of the rest of its batch. */
async function contentKey(file: File) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  const bytes = await file.arrayBuffer();
  try {
    const digest = await subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

/** Owns local resources, serialized ingestion, and the image collection independently of its presentation. */
export function useGalleryImages(
  initialImages: ImageItem[],
  limits: Required<GalleryLimits>,
  onImagesChange?: (images: ImageItem[]) => void
) {
  const [images, setImages] = useState(() => [...initialImages]);
  const collection = useRef(images);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [processing, setProcessing] = useState<{ completed: number; total: number } | null>(null);
  const progress = useRef({ completed: 0, total: 0 });
  const mounted = useRef(false);
  const instanceId = useId();
  const counter = useRef(0);
  const owned = useRef(new Map<string, { id: string; url: string }>());
  const keys = useRef(new Map<string, string>());
  const queue = useRef(Promise.resolve());
  const callback = useRef(onImagesChange);
  callback.current = onImagesChange;
  const previous = useRef(images);

  useEffect(
    function notifyCollectionChange() {
      if (previous.current !== images) {
        previous.current = images;
        callback.current?.([...images]);
      }
    },
    [images]
  );

  useEffect(function manageResources() {
    mounted.current = true;
    const urls = owned.current;
    const ids = keys.current;
    return function releaseResources() {
      mounted.current = false;
      for (const { url } of urls.values()) URL.revokeObjectURL(url);
      urls.clear();
      ids.clear();
    };
  }, []);

  const updateImages = useCallback(function updateImages(update: (previous: ImageItem[]) => ImageItem[]) {
    collection.current = update(collection.current);
    setImages(collection.current);
  }, []);

  const reportError = useCallback(function reportError(message: string) {
    if (mounted.current) setError((previous) => (previous ? \`\${previous} \${message}\` : message));
  }, []);

  const addFiles = useCallback(
    function addFiles(list: FileList | File[] | null) {
      const files = Array.from(list ?? []);
      if (!mounted.current || !files.length) return Promise.resolve();
      progress.current.total += files.length;
      setProcessing({ ...progress.current });

      const process = async function processFiles() {
        if (!mounted.current) return;
        let added = 0;
        let duplicates = 0;
        let invalid = 0;
        let overBudget = 0;
        let unreadable = 0;
        for (const file of files) {
          if (!mounted.current) return;
          try {
            if (!acceptedTypes.includes(file.type) || file.size >= limits.maxFileSize) {
              invalid++;
              continue;
            }
            const hash = await contentKey(file);
            if (!mounted.current) return;
            const id = \`local-\${instanceId}-\${counter.current++}\`;
            const key = hash ? JSON.stringify([file.name, hash]) : \`unique:\${id}\`;
            if (hash && owned.current.has(key)) {
              duplicates++;
              continue;
            }
            const totalBytes = collection.current.reduce((total, image) => total + (image.size ?? 0), 0);
            if (collection.current.length >= limits.maxFiles || totalBytes + file.size > limits.maxTotalSize) {
              overBudget++;
              continue;
            }
            const url = URL.createObjectURL(file);
            owned.current.set(key, { id, url });
            keys.current.set(id, key);
            updateImages((previous) => [...previous, { id, name: file.name, size: file.size, src: url }]);
            added++;
          } catch {
            unreadable++;
          } finally {
            progress.current.completed++;
            if (mounted.current) setProcessing({ ...progress.current });
          }
        }
        if (!mounted.current) return;
        const errors = [];
        if (invalid) errors.push(\`Use JPG, PNG, GIF, or WebP images smaller than \${limits.maxFileSize / MiB} MiB.\`);
        if (overBudget)
          errors.push(\`Gallery limit reached: \${limits.maxFiles} images and \${limits.maxTotalSize / MiB} MiB total.\`);
        if (unreadable) errors.push('We couldn’t read some images. Please try again.');
        setError(errors.join(' '));
        const messages = [];
        if (added) messages.push(\`\${added} \${added === 1 ? 'image' : 'images'} added.\`);
        if (duplicates) messages.push(\`\${duplicates} \${duplicates === 1 ? 'duplicate' : 'duplicates'} skipped.\`);
        setNotice(messages.join(' '));
      };
      const pending = queue.current.then(process);
      queue.current = pending
        .catch(function failedBatch() {
          reportError('We couldn’t read these images. Please try again.');
        })
        .finally(function finishBatch() {
          if (progress.current.completed === progress.current.total) {
            progress.current = { completed: 0, total: 0 };
            if (mounted.current) setProcessing(null);
          }
        });
      return queue.current;
    },
    [instanceId, limits.maxFiles, limits.maxFileSize, limits.maxTotalSize, reportError, updateImages]
  );

  const removeImage = useCallback(
    function removeImage(image: ImageItem) {
      const key = keys.current.get(image.id);
      const entry = key ? owned.current.get(key) : undefined;
      if (key && entry) {
        URL.revokeObjectURL(entry.url);
        owned.current.delete(key);
        keys.current.delete(image.id);
      }
      updateImages((previous) => previous.filter((item) => item.id !== image.id));
      setNotice(\`\${image.name} removed.\`);
    },
    [updateImages]
  );

  const retryImage = useCallback(
    function retryImage(image: ImageItem) {
      updateImages((previous) =>
        previous.map((item) => (item.id === image.id ? { ...item, status: 'loading', errorMessage: undefined } : item))
      );
      setNotice(\`\${image.name} is retrying.\`);
    },
    [updateImages]
  );

  const markReady = useCallback(
    function markReady(id: string) {
      updateImages((previous) =>
        previous.map((item) => (item.id === id ? { ...item, status: 'ready', errorMessage: undefined } : item))
      );
      setNotice('Image is ready to view.');
    },
    [updateImages]
  );

  const markError = useCallback(
    function markError(id: string) {
      updateImages((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status: 'error', errorMessage: \`Couldn’t load \${item.name}.\` } : item
        )
      );
      setNotice('Image failed to load.');
    },
    [updateImages]
  );

  return { images, error, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError };
}
`},{path:`index.tsx`,language:`tsx`,source:`export { Gallery, type GalleryProps } from './components/gallery';
export type { ImageItem } from './data/types';
`}]},children:(0,h.jsx)(i,{of:f,inline:!0})})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),o(),s(),d()})))()}g();export{m as default};