import{i as e}from"./preload-helper-CYPGu_IH.js";import{F as t}from"./iframe-D7TWL8ax.js";import{S as n,l as r,s as i,u as a}from"./blocks-DDZKObJ_.js";import{t as o}from"./mdx-react-shim-BIVLbBJ9.js";import{n as s}from"./runtime-CYIcy7Kg.js";import{n as c,t as l}from"./storybook-runtime-Bg-F_D-v.js";import{Preview as u,n as d,t as f}from"./gallery.stories-SeqAYB2W.js";function p(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{of:f,name:`Overview`,id:`blocks-gallery`}),`
`,(0,h.jsx)(t.h1,{id:`gallery`,children:`Gallery`}),`
`,(0,h.jsx)(t.p,{children:`Browse images in a list or grid, add local files, and open a media viewer.`}),`
`,(0,h.jsx)(l,{block:{id:`gallery`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/gallery`,files:[{path:`components/drop-overlay/index.module.css`,language:`css`,source:`.overlay {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: var(--ux-2jubes, 16px);
  background-color: rgba(216, 239, 239, 0.9);
  pointer-events: none;
  inset: 0;
}
`},{path:`components/drop-overlay/index.tsx`,language:`tsx`,source:`import { Box, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DropOverlayProps {
  /** Whether an accepted file is currently over the gallery. */
  isDropTarget: boolean;
}

/** Shows the green drop feedback while files are over the gallery. */
export function DropOverlay({ isDropTarget }: DropOverlayProps) {
  if (!isDropTarget) return null;

  return (
    <Box role="status" aria-live="polite" className={styles.overlay}>
      <Flex direction="column" alignItems="center" gap="sm" padding="xl">
        <Icon icon="upload" aria-hidden="true" />
        <Text as="strong">Drop Files to upload.</Text>
      </Flex>
    </Box>
  );
}
`},{path:`components/empty-state/index.module.css`,language:`css`,source:`.emptyState {
  min-block-size: 16rem;
  border: 1px dashed var(--color-border-low-contrast, #d4dbe0);
  border-radius: var(--ux-2jubes, 16px);
  background-color: var(--color-surface-background-passive, var(--ux-l7zq7p, #ffffff));
  text-align: center;
}

.iconSurface {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-low-contrast, #d4dbe0);
  background-color: var(--color-action-background-secondary-default, var(--ux-1r87102, #ffffff));
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
      <Box padding="md" rounding="full" aria-hidden="true" className={styles.iconSurface}>
        <Icon icon="upload" />
      </Box>
      <Heading level={3}>Start your gallery</Heading>
      <Text className={styles.description}>Drop images here or choose Add files above to upload.</Text>
    </Flex>
  );
}
`},{path:`components/file-cover/index.module.css`,language:`css`,source:`.surface {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  max-inline-size: 100%;
  border: 1px solid var(--ux-box-border-color, #e5e5e5);
  background: var(--uxFileUpload-backgroundColor, #f5f5f5);
  object-fit: cover;
}

.surface:where([data-variant="horizontal"]) {
  inline-size: 3.5rem;
  block-size: 3.5rem;
}

.surface:where([data-variant="vertical"]) {
  inline-size: 100%;
  aspect-ratio: 1;
}

.error {
  display: flex;
  border-color: var(--color-feedback-critical-strong, #db1802);
  background: var(--color-feedback-critical-background, #fde8e7);
  color: var(--color-feedback-critical-strong, #db1802);
}

.openButton {
  display: block;
  inline-size: 100%;
  padding: 0;
}
`},{path:`components/file-cover/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Icon, Image } from '@godaddy/antares';
import type { ImageItem } from '../../data/sample-images.ts';
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
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onOpen, onLoadError }: FileCoverProps) {
  const [loadError, setLoadError] = useState(false);
  const hasError = image.status === 'error' || loadError;

  useEffect(
    function resetLoadState() {
      setLoadError(false);
    },
    [image.id, image.status]
  );

  const handleOpen = useCallback(
    function handleOpen() {
      onOpen?.(image.id);
    },
    [image.id, onOpen]
  );

  const handleImageError = useCallback(
    function handleImageError() {
      setLoadError(true);
      onLoadError?.(image.id);
    },
    [image.id, onLoadError]
  );

  if (hasError) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        role="img"
        aria-label={\`\${image.name} failed to upload\`}
        rounding="md"
        className={\`\${styles.surface} \${styles.error}\`}
        data-variant={variant}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    );
  }

  const picture = (
    <Box
      as={Image}
      src={image.src}
      alt={onOpen ? '' : image.name}
      aria-hidden={onOpen ? true : undefined}
      rounding="md"
      className={styles.surface}
      data-variant={variant}
      loading="lazy"
      decoding="async"
      onError={handleImageError}
    />
  );

  if (!onOpen) return picture;

  return (
    <Button variant="minimal" aria-label={\`Open \${image.name}\`} onPress={handleOpen} className={styles.openButton}>
      {picture}
    </Button>
  );
}
`},{path:`components/file-item/index.module.css`,language:`css`,source:`.item {
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--ux-box-border-color, #e5e5e5);
  border-radius: var(--ux-2jubes, 6px);
}

.item:where([data-variant="horizontal"]) {
  inline-size: 100%;
  block-size: 4.625rem;
  min-block-size: 4.625rem;
}

.item:where([data-variant="vertical"]) {
  inline-size: 100%;
  min-inline-size: 0;
  background-color: var(--color-surface-background-passive, var(--ux-l7zq7p, #ffffff));
}

.item:where([data-variant="vertical"]:focus-within) {
  outline: 2px solid Highlight;
  outline-offset: 2px;
}

@media (hover: hover) and (pointer: fine) {
  .item:where([data-variant="vertical"]:hover) {
    border-color: var(--color-action-border-secondary-hovered, var(--ux-kkdx4n, #09757a));
  }
}

.coverSlot {
  position: relative;
}

.coverSlot:where([data-variant="horizontal"]) {
  flex: 0 0 3.5rem;
  inline-size: 3.5rem;
}

.details {
  flex: 1 1 auto;
  min-inline-size: 0;
  overflow: hidden;
}

.details:where([data-variant="vertical"]) {
  min-block-size: 5.5rem;
}

.details:where([data-variant="horizontal"]) {
  padding-inline-end: 2rem;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.errorDetails {
  min-inline-size: 0;
}

.errorDetails:where([data-variant="horizontal"]) {
  flex-wrap: nowrap;
}

.remove {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  padding: 0;
  background: var(--ux-control-backgroundColor, #ffffff);
}
`},{path:`components/file-item/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback } from 'react';
import { Box, Button, Detail, Flex, Icon, Text } from '@godaddy/antares';
import { FileCover, type FileCoverVariant } from '../file-cover/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

type FileItemVariant = 'horizontal' | 'vertical';

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

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;
}

const coverVariants: Record<FileItemVariant, FileCoverVariant> = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry, onLoadError }: FileItemProps) {
  const size =
    image.size === undefined ? 'Sample image' : \`\${fileSizeFormatter.format(image.size / (1024 * 1024))} MiB\`;
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
        <FileCover
          image={image}
          variant={coverVariants[variant]}
          onOpen={isError ? undefined : onOpen}
          onLoadError={onLoadError}
        />
      </Box>

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
          <Flex
            direction={variant === 'horizontal' ? 'row' : 'column'}
            gap="xs"
            alignItems={variant === 'horizontal' ? 'center' : 'start'}
            className={styles.errorDetails}
            data-variant={variant}
          >
            <Detail emphasis="critical" maxLines={1}>
              {image.errorMessage ?? 'File upload failed.'}
            </Detail>
            <Button variant="inline" size="sm" aria-label={\`Retry \${image.name}\`} onPress={handleRetry}>
              <Icon icon="refresh" aria-hidden="true" />
              Retry
            </Button>
          </Flex>
        ) : (
          <Detail>{size}</Detail>
        )}
      </Flex>

      <Button
        variant="minimal"
        size="sm"
        aria-label={\`Remove \${image.name}\`}
        onPress={handleRemove}
        className={styles.remove}
        data-variant={variant}
      >
        <Icon icon="x" aria-hidden="true" />
      </Button>
    </Flex>
  );
}
`},{path:`components/gallery/index.module.css`,language:`css`,source:`.content {
  position: relative;
  inline-size: 100%;
  min-inline-size: 0;
}

.toolbar {
  align-items: center;
  justify-content: space-between;
}

.toolbarActions {
  justify-content: flex-end;
}

.dropZone {
  inline-size: 100%;
  background: transparent;
  border: 0;
  border-radius: 0;
}

@media (max-width: 48rem) {
  .toolbarActions {
    flex-basis: 100%;
    inline-size: 100%;
    justify-content: space-between;
  }
}
`},{path:`components/gallery/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useRef, useState, type ComponentProps } from 'react';
import {
  Box,
  Detail,
  DropZone,
  type DropZoneRenderProps,
  Flex,
  Heading,
  Icon,
  SegmentedController,
  SegmentedControllerItem,
  Tag,
  TextContext,
  isFileDropItem
} from '@godaddy/antares';
import { DropOverlay } from '../drop-overlay/index.tsx';
import { EmptyState } from '../empty-state/index.tsx';
import { sampleImages, type ImageItem } from '../../data/sample-images.ts';
import { GridView } from '../grid-view/index.tsx';
import { ListView } from '../list-view/index.tsx';
import { UploadPrompt } from '../upload-prompt/index.tsx';
import { Viewer } from '../viewer/index.tsx';
import styles from './index.module.css';

const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const maximumSize = 256 * 1024 * 1024;
let localImageCounter = 0;

/** Returns the singular or plural label matching a count. */
function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

/** Creates a unique ID for a locally added image with a Web Crypto fallback. */
function createLocalImageId() {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) return \`local-\${uuid}\`;

  const random = new Uint32Array(2);
  globalThis.crypto?.getRandomValues?.(random);
  return \`local-\${Date.now()}-\${localImageCounter++}-\${random[0]}-\${random[1]}\`;
}

export interface GalleryProps {
  /** Initial images; read once on mount. Pass [] to start empty. IDs must be unique. */
  initialImages?: ImageItem[];

  /** Initial presentation; switching views preserves the collection. */
  defaultView?: 'list' | 'grid';
}

type DropEvent = Parameters<NonNullable<ComponentProps<typeof DropZone>['onDrop']>>[0];

/** Copyable local gallery with accessible list/grid views, file upload, and media viewing. */
export function Gallery({ initialImages = sampleImages, defaultView = 'grid' }: GalleryProps) {
  const [images, setImages] = useState<ImageItem[]>(function initializeImages() {
    return [...initialImages];
  });
  const [view, setView] = useState(defaultView);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const mounted = useRef(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const ownedByKey = useRef(new Map<string, { id: string; url: string }>());
  const keyById = useRef(new Map<string, string>());

  useEffect(function manageLifecycle() {
    mounted.current = true;
    const urls = ownedByKey.current;
    const ids = keyById.current;

    return function releaseOwnedImages() {
      mounted.current = false;
      for (const entry of urls.values()) URL.revokeObjectURL(entry.url);
      urls.clear();
      ids.clear();
    };
  }, []);

  const addFiles = useCallback(function addFiles(list: FileList | File[] | null) {
    if (!list?.length) return;

    const added: ImageItem[] = [];
    let rejected = 0;
    let duplicates = 0;

    for (const file of Array.from(list)) {
      if (!acceptedTypes.includes(file.type) || file.size >= maximumSize) {
        rejected++;
        continue;
      }

      const key = JSON.stringify([file.name, file.size, file.type, file.lastModified]);
      if (ownedByKey.current.has(key)) {
        duplicates++;
        continue;
      }

      const id = createLocalImageId();
      const url = URL.createObjectURL(file);
      ownedByKey.current.set(key, { id, url });
      keyById.current.set(id, key);
      added.push({ id, name: file.name, size: file.size, src: url });
    }

    setImages(function appendImages(previous) {
      return [...previous, ...added];
    });
    setError(rejected ? 'Use JPG, PNG, GIF, or WebP images smaller than 256 MiB.' : '');
    const messages = [];
    if (added.length > 0) {
      messages.push(\`\${added.length} \${pluralize(added.length, 'image', 'images')} added.\`);
    }
    if (duplicates > 0) {
      messages.push(\`\${duplicates} \${pluralize(duplicates, 'duplicate', 'duplicates')} skipped.\`);
    }
    setNotice(messages.join(' '));
  }, []);

  const removeImage = useCallback(function removeImage(image: ImageItem) {
    const key = keyById.current.get(image.id);
    const entry = key ? ownedByKey.current.get(key) : undefined;

    if (key && entry) {
      URL.revokeObjectURL(entry.url);
      ownedByKey.current.delete(key);
      keyById.current.delete(image.id);
    }

    setImages(function removeFromCollection(previous) {
      return previous.filter(function keepImage(item) {
        return item.id !== image.id;
      });
    });
    setNotice(\`\${image.name} removed.\`);
    addButton.current?.focus();
  }, []);

  const handleDropOperation = useCallback<NonNullable<ComponentProps<typeof DropZone>['getDropOperation']>>(
    function handleDropOperation(types) {
      return acceptedTypes.some(function supportsType(type) {
        return types.has(type);
      })
        ? 'copy'
        : 'cancel';
    },
    []
  );

  const handleDrop = useCallback(
    async function handleDrop(event: DropEvent) {
      if (event.dropOperation === 'cancel') return;

      try {
        const files = await Promise.all(
          event.items.filter(isFileDropItem).map(function readFile(item) {
            return item.getFile();
          })
        );
        if (mounted.current) addFiles(files);
      } catch {
        if (mounted.current) setError('We couldn’t read these images. Please try again.');
      }
    },
    [addFiles]
  );

  const handleViewChange = useCallback(function handleViewChange(key: string | number) {
    const next = String(key);
    if (next === 'list' || next === 'grid') setView(next);
  }, []);

  const handleOpenImage = useCallback(function handleOpenImage(id: string) {
    setActiveId(id);
  }, []);

  const handleRetryImage = useCallback(function handleRetryImage(image: ImageItem) {
    setImages(function markImageReady(previous) {
      return previous.map(function updateImage(item) {
        return item.id === image.id ? { ...item, status: 'ready', errorMessage: undefined } : item;
      });
    });
    setNotice(\`\${image.name} is retrying.\`);
  }, []);

  const handleImageLoadError = useCallback(function handleImageLoadError(id: string) {
    setActiveId(function clearFailedActiveImage(current) {
      return current === id ? null : current;
    });

    setImages(function markImageError(previous) {
      return previous.map(function updateImage(item) {
        return item.id === id ? { ...item, status: 'error', errorMessage: \`Couldn’t load \${item.name}.\` } : item;
      });
    });
  }, []);

  const handleCloseViewer = useCallback(function handleCloseViewer() {
    setActiveId(null);
  }, []);

  const renderDropZone = useCallback(
    function renderDropZone({ isDropTarget }: DropZoneRenderProps) {
      return (
        <TextContext.Provider value={null}>
          <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
            <Flex gap="md" wrap="wrap" className={styles.toolbar}>
              <Flex alignItems="center" gap="sm" wrap="wrap">
                <Heading level={2}>Gallery</Heading>
                <Tag size="sm">
                  {images.length} {images.length === 1 ? 'image' : 'images'}
                </Tag>
              </Flex>

              <Flex alignItems="center" gap="sm" wrap="wrap" className={styles.toolbarActions}>
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

            {notice ? (
              <Detail role="status" aria-live="polite">
                {notice}
              </Detail>
            ) : null}

            <Box role="region" aria-label={\`\${view === 'list' ? 'List' : 'Grid'} view\`}>
              {images.length === 0 ? (
                <EmptyState />
              ) : view === 'list' ? (
                <ListView
                  images={images}
                  onOpen={handleOpenImage}
                  onRemove={removeImage}
                  onRetry={handleRetryImage}
                  onLoadError={handleImageLoadError}
                />
              ) : (
                <GridView
                  images={images}
                  onOpen={handleOpenImage}
                  onRemove={removeImage}
                  onRetry={handleRetryImage}
                  onLoadError={handleImageLoadError}
                />
              )}
            </Box>

            <DropOverlay isDropTarget={isDropTarget} />
          </Flex>
        </TextContext.Provider>
      );
    },
    [
      addFiles,
      error,
      handleImageLoadError,
      handleOpenImage,
      handleRetryImage,
      handleViewChange,
      images,
      notice,
      removeImage,
      view
    ]
  );

  return (
    <>
      <DropZone
        aria-label="Add files to gallery"
        padding="0"
        alignItems="stretch"
        justifyContent="start"
        className={styles.dropZone}
        isDisabled={activeId !== null}
        getDropOperation={handleDropOperation}
        onDrop={handleDrop}
      >
        {renderDropZone}
      </DropZone>
      <Viewer
        images={images.filter(function filterViewableImage(image) {
          return image.status !== 'error';
        })}
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
import { FileItem } from '../file-item/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
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
}

/** Full-width responsive image grid with gallery-sized cards. */
export function GridView({ images, onOpen, onRemove, onRetry, onLoadError }: GridViewProps) {
  return (
    <Grid
      as="ul"
      columns="repeat(auto-fill, minmax(min(100%, 15rem), 1fr))"
      gap="md"
      justifyContent="start"
      alignItems="start"
      aria-label="Gallery image grid"
      className={styles.items}
    >
      {images.map(function renderGridItem(image) {
        return (
          <FileItem
            key={image.id}
            image={image}
            variant="vertical"
            onOpen={onOpen}
            onRemove={onRemove}
            onRetry={onRetry}
            onLoadError={onLoadError}
          />
        );
      })}
    </Grid>
  );
}
`},{path:`components/image/index.module.css`,language:`css`,source:`.image {
  display: block;
  max-inline-size: 100%;
}

.image:where([data-variant="viewer"]) {
  inline-size: 100%;
  max-block-size: 55dvh;
  object-fit: contain;
}

.image:where([data-variant="thumbnail"]) {
  inline-size: 5rem;
  block-size: 3.75rem;
  object-fit: cover;
}

.container {
  min-inline-size: 0;
}

.openButton {
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0;
}

.openButton:where([data-selected="true"]) {
  outline: 2px solid currentColor;
}
`},{path:`components/image/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useState } from 'react';
import { Box, Button, Flex, Icon, Image, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

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
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({
  image,
  variant = 'default',
  onOpen,
  label,
  selected,
  loading = 'lazy'
}: GalleryImageProps) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const inspectLoadedImage = useCallback(function inspectLoadedImage(element: HTMLImageElement | null) {
    if (element?.complete) setState(element.naturalWidth > 0 ? 'ready' : 'error');
  }, []);
  const handleLoad = useCallback(function handleLoad() {
    setState('ready');
  }, []);
  const handleError = useCallback(function handleError() {
    setState('error');
  }, []);
  const handleRetry = useCallback(function handleRetry() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);
  const handleOpen = useCallback(
    function handleOpen() {
      onOpen?.(image.id);
    },
    [image.id, onOpen]
  );

  let src = image.src;
  if (attempt > 0 && /^https?:/.test(src)) {
    const url = new URL(src);
    url.searchParams.set('gallery-retry', String(attempt));
    src = url.toString();
  }

  if (state === 'error') {
    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">Couldn’t load {image.name}.</Text>
        <Button variant="inline" aria-label={\`Retry \${image.name}\`} onPress={handleRetry}>
          Retry
        </Button>
      </Flex>
    );
  }

  const picture = (
    <Box
      as={Image}
      ref={inspectLoadedImage}
      key={attempt}
      src={src}
      alt={onOpen ? '' : image.name}
      className={styles.image}
      data-variant={variant}
      rounding="md"
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {onOpen ? (
        <Button
          variant="minimal"
          aria-label={label ?? \`View \${image.name}\`}
          aria-current={selected ? 'true' : undefined}
          onPress={handleOpen}
          className={styles.openButton}
          data-selected={selected ? 'true' : undefined}
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

import { useCallback, useState } from 'react';
import { Flex } from '@godaddy/antares';
import { FileItem } from '../file-item/index.tsx';
import { ViewBanner } from '../view-banner/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

interface ListViewProps {
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
}

const MAX_VISIBLE_ITEMS = 5;

/** Figma-aligned horizontal file list with counter and error banner. */
export function ListView({ images, onOpen, onRemove, onRetry, onLoadError }: ListViewProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? images : images.slice(0, MAX_VISIBLE_ITEMS);
  const errorCount = images.filter(function countError(image) {
    return image.status === 'error';
  }).length;

  const handleShowAll = useCallback(function handleShowAll() {
    setShowAll(true);
  }, []);

  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex as="ul" direction="column" gap="sm" aria-label="Gallery files" className={styles.items}>
        {visibleImages.map(function renderListItem(image) {
          return (
            <FileItem
              key={image.id}
              image={image}
              variant="horizontal"
              onOpen={onOpen}
              onRemove={onRemove}
              onRetry={onRetry}
              onLoadError={onLoadError}
            />
          );
        })}
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

/** Counter and upload-error feedback used below the Figma list layouts. */
export function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm" aria-label="Gallery file status">
      {hasMore || totalCount > 0 ? (
        <Flex justifyContent="space-between" alignItems="center" gap="sm">
          <Text role="status" aria-live="polite">
            {visibleCount} of {totalCount} files
          </Text>
          {hasMore ? (
            <Button variant="inline" onPress={onShowAll}>
              Show all
            </Button>
          ) : null}
        </Flex>
      ) : null}

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert" aria-live="assertive">
          <Icon icon="alert" aria-hidden="true" />
          <Text emphasis="critical">
            {errorCount} file{errorCount === 1 ? '' : 's'} upload failed.
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
}

.visuallyHidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
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
import { Button, Carousel, CloseButton, Content, Flex, Heading, Icon, Modal, Text } from '@godaddy/antares';
import { GalleryImage } from '../image/index.tsx';
import type { ImageItem } from '../../data/sample-images.ts';
import styles from './index.module.css';

type PropagatingKeyboardEvent<T extends Element> = ReactKeyboardEvent<T> & {
  continuePropagation(): void;
};

interface ViewerProps {
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
export function Viewer({ images, activeId, onClose, onSelectImage }: ViewerProps) {
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

      focusCurrentThumbnail.current =
        (document.activeElement === previousButton.current && index + offset === 0) ||
        (document.activeElement === nextButton.current && index + offset === images.length - 1);
      onSelectImage(nextImage.id);
    },
    [images, index, onSelectImage]
  );

  const navigate = useCallback(
    function navigate(event: ReactKeyboardEvent<HTMLElement>) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    },
    [move]
  );

  const handleCloseKeyDown = useCallback(
    function handleCloseKeyDown(event: PropagatingKeyboardEvent<HTMLButtonElement>) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') navigate(event);
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
    function renderSlide(slideImage: ImageItem) {
      return (
        <Flex key={slideImage.id} alignItems="center" justifyContent="center" className={styles.slide}>
          <GalleryImage image={slideImage} variant="viewer" loading={slideImage.id === activeId ? 'eager' : 'lazy'} />
        </Flex>
      );
    },
    [activeId]
  );

  const renderThumbnail = useCallback(
    function renderThumbnail(thumbnailImage: ImageItem) {
      return (
        <Flex as="li" key={thumbnailImage.id} flex="0 0 5rem">
          <GalleryImage
            image={thumbnailImage}
            variant="thumbnail"
            selected={thumbnailImage.id === activeId}
            label={\`View \${thumbnailImage.name}\`}
            onOpen={onSelectImage}
          />
        </Flex>
      );
    },
    [activeId, onSelectImage]
  );

  if (!image) return null;

  return (
    <Modal isOpen aria-label="Media gallery" onOpenChange={handleOpenChange} className={styles.modal}>
      <Heading slot="title" level={2} className={styles.visuallyHidden}>
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
          aria-label="Gallery images"
        >
          {images.map(renderSlide)}
        </Carousel>
        <Flex justifyContent="space-between" alignItems="center" gap="sm" wrap="wrap">
          <Text className={styles.name}>{image.name}</Text>
          <Flex gap="xs" alignItems="center">
            <Button
              ref={previousButton}
              variant="secondary"
              aria-label="Previous image"
              isDisabled={index === 0}
              onPress={handlePrevious}
            >
              <Icon icon="chevron-left" aria-hidden="true" />
            </Button>
            <Button
              ref={nextButton}
              variant="secondary"
              aria-label="Next image"
              isDisabled={index === images.length - 1}
              onPress={handleNext}
            >
              <Icon icon="chevron-right" aria-hidden="true" />
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
`},{path:`data/sample-images.ts`,language:`ts`,source:`/** The upload state shown by a gallery file item. */
export type ImageStatus = 'ready' | 'error';

/** An image shown by the gallery. IDs must be unique and stable. */
export interface ImageItem {
  /** Identity used by navigation and removal. */
  id: string;

  /** Visible filename and accessible image name. */
  name: string;

  /** Remote URL, data URL, or locally owned object URL. */
  src: string;

  /** Actual bytes when known; omitted for remote samples. */
  size?: number;

  /** Upload state used by the list/grid examples. */
  status?: ImageStatus;

  /** Optional message associated with a failed upload. */
  errorMessage?: string;
}

/** Fixed IDs keep the sample photographs consistent between visits. */
export const sampleImages: ImageItem[] = [
  { id: 'sample-1015', name: 'file_name.png', src: 'https://picsum.photos/id/1015/960/640', size: 5 * 1024 * 1024 },
  {
    id: 'sample-1016',
    name: 'Photo_2.png',
    src: 'https://picsum.photos/id/1016/960/640',
    size: 2 * 1024 * 1024
  },
  { id: 'sample-1018', name: 'Photo_3.png', src: 'https://picsum.photos/id/1018/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1025', name: 'Photo_4.png', src: 'https://picsum.photos/id/1025/960/640', size: 6 * 1024 * 1024 },
  { id: 'sample-1035', name: 'Photo_5.png', src: 'https://picsum.photos/id/1035/960/640', size: 3 * 1024 * 1024 },
  { id: 'sample-1043', name: 'Photo_6.png', src: 'https://picsum.photos/id/1043/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1050', name: 'Photo_7.png', src: 'https://picsum.photos/id/1050/960/640', size: 5 * 1024 * 1024 },
  { id: 'sample-1069', name: 'Photo_8.png', src: 'https://picsum.photos/id/1069/960/640', size: 3 * 1024 * 1024 },
  { id: 'sample-1068', name: 'Photo_9.png', src: 'https://picsum.photos/id/1068/960/640', size: 4 * 1024 * 1024 },
  { id: 'sample-1074', name: 'Photo_10.png', src: 'https://picsum.photos/id/1074/960/640', size: 6 * 1024 * 1024 },
  {
    id: 'sample-error',
    name: 'Photo_error.png',
    src: 'https://picsum.photos/id/1084/960/640',
    size: 5 * 1024 * 1024,
    status: 'error',
    errorMessage: 'Couldn’t load Photo_error.png.'
  }
];
`},{path:`index.tsx`,language:`tsx`,source:`export { Gallery, type GalleryProps } from './components/gallery/index.tsx';
export type { ImageItem, ImageStatus } from './data/sample-images';
`}]},children:(0,h.jsx)(r,{of:u,inline:!0})})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),o(),c(),a(),s(),d()}))();export{m as default};