import{i as e}from"./preload-helper-BwFWomYJ.js";import{F as t}from"./iframe-DQv7oM7t.js";import{S as n,l as r,s as i,u as a}from"./blocks-UmTD3L_U.js";import{t as o}from"./mdx-react-shim-CNvNcqDb.js";import{n as s}from"./runtime-B4iQ4tLL.js";import{n as c,t as l}from"./storybook-runtime-00xlIqXC.js";import{Preview as u,t as d}from"./sign-in-form.stories-DYGUzm8j.js";import{Preview as f,n as p}from"./gallery.stories-DAAPlpSD.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{title:`Blocks`,id:`blocks`}),`
`,(0,g.jsx)(t.h1,{id:`build-product-experiences-with-antares`,children:`Build product experiences with Antares.`}),`
`,(0,g.jsx)(t.p,{children:`Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.`}),`
`,(0,g.jsx)(t.h2,{id:`install-a-block`,children:`Install a block`}),`
`,(0,g.jsx)(t.p,{children:`From the root of your application, run the command copied by the block's Install button:`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form
`})}),`
`,(0,g.jsx)(t.h2,{id:`blocks`,children:`Blocks`}),`
`,(0,g.jsx)(t.h3,{id:`gallery`,children:`Gallery`}),`
`,(0,g.jsx)(l,{block:{id:`gallery`,description:`Browse images in a list or grid, add local files, and open a media viewer.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/gallery`,files:[{path:`components/empty-state/index.module.css`,language:`css`,source:`.emptyState {
  min-block-size: 16rem;
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
  display: block;
  max-inline-size: 100%;
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
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/file-cover/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback } from 'react';
import { Flex, Icon } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from '../image/image-surface';
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
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onOpen, onLoadError, onLoadSuccess }: FileCoverProps) {
  const reportLoadError = useCallback(() => onLoadError?.(image.id), [image.id, onLoadError]);
  const reportLoadSuccess = useCallback(() => onLoadSuccess?.(image.id), [image.id, onLoadSuccess]);
  const { state, imageRef, onLoad, onError } = useImageLoadState(image.src, {
    resetKey: \`\${image.id}:\${image.status ?? ''}\`,
    onLoad: onLoadSuccess ? reportLoadSuccess : undefined,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';

  if (hasError) {
    return (
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
    );
  }

  return (
    <ImageSurface
      ref={imageRef}
      src={image.src}
      alt={image.name}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={\`Open \${image.name}\`}
    />
  );
}
`},{path:`components/file-item/index.module.css`,language:`css`,source:`.item {
  inline-size: 100%;
  min-inline-size: 0;
}

.card:where([data-variant="horizontal"]) {
  block-size: 4.625rem;
  min-block-size: 4.625rem;
}

.details {
  min-inline-size: 0;
  overflow: hidden;
}

.details:where([data-variant="vertical"]) {
  min-block-size: 5.5rem;
}

.errorDetails {
  min-inline-size: 0;
}
`},{path:`components/file-item/index.tsx`,language:`tsx`,source:`'use client';

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

/** One file item with the same actions and states across list and grid views. */
export function FileItem({ image, variant, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: FileItemProps) {
  const size =
    image.size === undefined ? 'Sample image' : \`\${fileSizeFormatter.format(image.size / (1024 * 1024))} MiB\`;
  const isError = image.status === 'error';
  const isLoading = image.status === 'loading';
  const canOpen = !isError && !isLoading;

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
              role={variant === 'vertical' ? 'alert' : undefined}
            >
              <Detail emphasis="critical" maxLines={1}>
                {image.errorMessage ?? 'File needs attention.'}
              </Detail>
              <Button variant="inline" size="sm" aria-label={\`Retry \${image.name}\`} onPress={() => onRetry(image)}>
                <Icon icon="refresh" aria-hidden="true" />
                Retry
              </Button>
            </Flex>
          ) : (
            <Detail>{isLoading ? 'Loading image…' : size}</Detail>
          )}
        </Flex>

        <CornerActions padding="sm">
          <Button variant="secondary" size="sm" aria-label={\`Remove \${image.name}\`} onPress={() => onRemove(image)}>
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
}

/** Shared collection renderer used by the list and grid layouts. */
export function FileItems({ images, variant, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: FileItemsProps) {
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
      />
    );
  });
}
`},{path:`components/gallery/index.module.css`,language:`css`,source:`.content {
  inline-size: 100%;
  min-inline-size: 0;
}

.dropOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 1.5px dashed var(--ux-187j9dd, #00a4a6);
  border-radius: var(--ux-2jubes, 16px);
  background: rgba(216, 239, 239, 0.9);
  pointer-events: none;
}

.dropZone {
  inline-size: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
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
  Text,
  TextContext,
  isFileDropItem
} from '@godaddy/antares';
import { EmptyState } from '../empty-state';
import type { ImageItem } from '../../data/types';
import { GridView } from '../grid-view';
import { ListView } from '../list-view';
import { UploadPrompt } from '../upload-prompt';
import { Viewer } from '../viewer';
import styles from './index.module.css';

const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const maximumSize = 256 * 1024 * 1024;
let localImageCounter = 0;

/** Returns the singular or plural label matching a count. */
function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

function getDropZoneStyle({ isDropTarget }: DropZoneRenderProps) {
  return isDropTarget
    ? {
        border: '1.5px dashed #00a4a6',
        borderRadius: '16px',
        background: 'rgba(216, 239, 239, 0.9)'
      }
    : undefined;
}

/** Creates a unique ID for a locally added image with a Web Crypto fallback. */
function createLocalImageId() {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) return \`local-\${uuid}\`;

  const random = new Uint32Array(2);
  globalThis.crypto?.getRandomValues?.(random);
  return \`local-\${Date.now()}-\${localImageCounter++}-\${random[0]}-\${random[1]}\`;
}

/** Returns a byte-based identity for duplicate detection when Web Crypto is available. */
async function getFileContentKey(file: File) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;

  try {
    const digest = await subtle.digest('SHA-256', await file.arrayBuffer());
    return Array.from(new Uint8Array(digest), function formatByte(byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  } catch {
    return null;
  }
}

export interface GalleryProps {
  /** Initial images; read once on mount. Defaults to an empty gallery. IDs must be unique. */
  initialImages?: ImageItem[];

  /** Initial presentation; switching views preserves the collection. */
  defaultView?: 'list' | 'grid';
}

type DropEvent = Parameters<NonNullable<ComponentProps<typeof DropZone>['onDrop']>>[0];

/** Copyable local gallery with accessible list/grid views, file upload, and media viewing. */
export function Gallery({ initialImages = [], defaultView = 'grid' }: GalleryProps) {
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

  const addFiles = useCallback(async function addFiles(list: FileList | File[] | null) {
    if (!list?.length) return;

    const added: ImageItem[] = [];
    let rejected = 0;
    let duplicates = 0;
    const validFiles: File[] = [];

    for (const file of Array.from(list)) {
      if (!acceptedTypes.includes(file.type) || file.size >= maximumSize) {
        rejected++;
        continue;
      }

      validFiles.push(file);
    }

    const keyedFiles = await Promise.all(
      validFiles.map(async function identifyFile(file) {
        return { file, contentKey: await getFileContentKey(file) };
      })
    );

    for (const { file, contentKey } of keyedFiles) {
      const id = createLocalImageId();
      const key = contentKey ? JSON.stringify([file.name, contentKey]) : \`unique:\${id}\`;
      if (contentKey && ownedByKey.current.has(key)) {
        duplicates++;
        continue;
      }

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
        if (mounted.current) await addFiles(files);
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
    setImages(function markImageLoading(previous) {
      return previous.map(function updateImage(item) {
        return item.id === image.id ? { ...item, status: 'loading', errorMessage: undefined } : item;
      });
    });
    setNotice(\`\${image.name} is retrying.\`);
  }, []);

  const handleImageLoad = useCallback(function handleImageLoad(id: string) {
    setImages(function markImageReady(previous) {
      return previous.map(function updateImage(item) {
        return item.id === id ? { ...item, status: 'ready', errorMessage: undefined } : item;
      });
    });
    setNotice('Image is ready to view.');
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
    setNotice('Image failed to load.');
  }, []);

  const handleCloseViewer = useCallback(function handleCloseViewer() {
    setActiveId(null);
  }, []);

  const renderDropZone = useCallback(
    function renderDropZone({ isDropTarget }: DropZoneRenderProps) {
      return (
        <TextContext.Provider value={null}>
          <Flex direction="column" gap="lg" padding="lg" className={styles.content}>
            <Flex gap="md" wrap="wrap" alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap="sm" wrap="wrap">
                <Heading level={2}>Gallery</Heading>
                <Tag size="sm">
                  {images.length} {pluralize(images.length, 'image', 'images')}
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
                  onLoadSuccess={handleImageLoad}
                />
              ) : (
                <GridView
                  images={images}
                  onOpen={handleOpenImage}
                  onRemove={removeImage}
                  onRetry={handleRetryImage}
                  onLoadError={handleImageLoadError}
                  onLoadSuccess={handleImageLoad}
                />
              )}
            </Box>
          </Flex>
        </TextContext.Provider>
      );
    },
    [
      addFiles,
      error,
      handleImageLoadError,
      handleImageLoad,
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
        style={getDropZoneStyle}
        isDisabled={activeId !== null}
        getDropOperation={handleDropOperation}
        onDrop={handleDrop}
      >
        {function renderGalleryDropZone(props) {
          return (
            <>
              {renderDropZone(props)}
              {props.isDropTarget ? (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  role="status"
                  aria-live="polite"
                  data-drop-overlay
                  className={styles.dropOverlay}
                >
                  <Text as="strong">Drop files to upload.</Text>
                </Flex>
              ) : null}
            </>
          );
        }}
      </DropZone>
      <Viewer
        images={images.filter(function filterViewableImage(image) {
          return image.status !== 'error' && image.status !== 'loading';
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
}

/** Full-width responsive image grid with gallery-sized cards. */
export function GridView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: GridViewProps) {
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
      <FileItems
        images={images}
        variant="vertical"
        onOpen={onOpen}
        onRemove={onRemove}
        onRetry={onRetry}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
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

import { forwardRef, useCallback, useEffect, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, Image } from '@godaddy/antares';
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

/** Shares image loading, retry, and complete-image handling across Gallery surfaces. */
export function useImageLoadState(
  src: string,
  { resetKey = '', onLoad: reportLoad, onError: reportError }: UseImageLoadStateOptions = {}
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');
  const reportedErrorKey = useRef<string | null>(null);
  const reportedLoadKey = useRef<string | null>(null);
  const loadKey = \`\${src}:\${resetKey}:\${attempt}\`;

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

  useEffect(
    function resetImageState() {
      setAttempt(0);
      setState('loading');
    },
    [resetKey, src]
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
  /** Image source and accessible name. */
  src: string;
  alt: string;

  /** Presentation variant consumed by the caller's stylesheet. */
  variant?: string;

  /** Image presentation and loading behavior. */
  className?: string;
  loading?: 'eager' | 'lazy';

  /** Native image lifecycle handlers. */
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;

  /** Optional activation wrapper for a viewable image. */
  onOpen?: () => void;
  label?: string;
  selected?: boolean;
}

/** Renders the shared image element and optional accessible action wrapper. */
export const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  { src, alt, variant, className, loading = 'lazy', onLoad, onError, onOpen, label, selected },
  ref
) {
  const image = (
    <Box
      as={Image}
      ref={ref}
      src={src}
      alt={onOpen ? '' : alt}
      aria-hidden={onOpen ? true : undefined}
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
      className={styles.openButton}
    >
      {image}
    </Button>
  );
});
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

.errorSurface {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-feedback-critical-subtle, var(--ux-1iiiqs3, #fde8e7));
  color: var(--color-feedback-critical-onsubtle, var(--ux-xaxxaq, #8b0000));
}
`},{path:`components/image/index.tsx`,language:`tsx`,source:`'use client';

import { Button, Flex, Icon, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { ImageSurface, useImageLoadState } from './image-surface';
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
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(image.src, {
    resetKey: image.id
  });

  if (state === 'error') {
    if (variant === 'thumbnail') {
      return (
        <Flex
          className={\`\${styles.image} \${styles.errorSurface}\`}
          data-variant={variant}
          role="img"
          aria-label={\`\${image.name} failed to load\`}
        >
          <Icon icon="alert" aria-hidden="true" />
        </Flex>
      );
    }

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

  const picture = (
    <ImageSurface
      ref={imageRef}
      key={attempt}
      src={src}
      alt={image.name}
      className={styles.image}
      variant={variant}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      onOpen={onOpen ? () => onOpen(image.id) : undefined}
      label={label ?? \`View \${image.name}\`}
      selected={selected}
    />
  );

  return (
    <Flex direction="column" gap="xs" aria-busy={state === 'loading'} className={styles.container}>
      {picture}
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

import { useState } from 'react';
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

  /** Retries a failed upload. */
  onRetry: (image: ImageItem) => void;

  /** Reports an image decode or network failure. */
  onLoadError: (id: string) => void;

  /** Reports a successful image load. */
  onLoadSuccess: (id: string) => void;
}

const MAX_VISIBLE_ITEMS = 5;

/** Figma-aligned horizontal file list with counter and error banner. */
export function ListView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: ListViewProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? images : images.slice(0, MAX_VISIBLE_ITEMS);
  const errorCount = images.filter(function countError(image) {
    return image.status === 'error';
  }).length;

  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex as="ul" direction="column" gap="sm" aria-label="Gallery files" className={styles.items}>
        <FileItems
          images={visibleImages}
          variant="horizontal"
          onOpen={onOpen}
          onRemove={onRemove}
          onRetry={onRetry}
          onLoadError={onLoadError}
          onLoadSuccess={onLoadSuccess}
        />
      </Flex>
      <ViewBanner
        visibleCount={visibleImages.length}
        totalCount={images.length}
        errorCount={errorCount}
        onShowAll={() => setShowAll(true)}
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

/** Counter and image-error feedback used below the Figma list layouts. */
export function ViewBanner({ visibleCount, totalCount, errorCount, onShowAll }: ViewBannerProps) {
  const hasMore = visibleCount < totalCount;
  if (!hasMore && errorCount === 0) return null;

  return (
    <Flex direction="column" gap="sm" blockPadding="sm" aria-label="Gallery file status">
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

      {errorCount > 0 ? (
        <Flex justifyContent="center" alignItems="center" gap="xs" role="alert" aria-live="assertive">
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
import { GalleryImage } from '../image';
import type { ImageItem } from '../../data/types';
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
          <Text className={styles.name} role="status" aria-live="polite" aria-atomic="true">
            {image.name}
          </Text>
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
`},{path:`data/sample-images.ts`,language:`ts`,source:`import type { ImageItem } from './types';

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
`},{path:`data/types.ts`,language:`ts`,source:`/** The load state shown by a gallery file item. */
export type ImageStatus = 'ready' | 'loading' | 'error';

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

  /** Load state used by the list/grid examples. */
  status?: ImageStatus;

  /** Optional message associated with a failed upload. */
  errorMessage?: string;
}
`},{path:`index.tsx`,language:`tsx`,source:`export { Gallery, type GalleryProps } from './components/gallery';
export type { ImageItem, ImageStatus } from './data/types';
`}]},children:(0,g.jsx)(r,{of:f,inline:!0})}),`
`,(0,g.jsx)(t.h3,{id:`sign-in-form`,children:`Sign-in form`}),`
`,(0,g.jsx)(l,{block:{id:`sign-in-form`,description:`A simple Antares sign-in experience.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form`,files:[{path:`components/sign-in-fields.tsx`,language:`tsx`,source:`import { Flex, Input, Label, TextField } from '@godaddy/antares';
import { signInCopy } from '../data/copy';

/** Groups the accessible fields used by the sign-in form block. */
export function SignInFields() {
  return (
    <Flex direction="column" gap="md">
      <TextField name="email" isRequired>
        <Label>{signInCopy.emailLabel}</Label>
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
      </TextField>
      <TextField name="password" isRequired>
        <Label>{signInCopy.passwordLabel}</Label>
        <Input type="password" autoComplete="current-password" />
      </TextField>
    </Flex>
  );
}
`},{path:`components/sign-in-form.tsx`,language:`tsx`,source:`'use client';

import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';
import { signInCopy } from '../data/copy';
import { SignInFields } from './sign-in-fields';

/**
 * Provides a sign-in form composition to copy and adapt. Submission is prevented
 * until the consuming application supplies its authentication behavior.
 *
 * @example
 * \`\`\`tsx
 * <SignInForm />
 * \`\`\`
 */
export function SignInForm() {
  return (
    <Flex justifyContent="center">
      <Box flex="0 1 28rem" padding="xl" rounding="md" elevation="card">
        <Flex
          as="form"
          direction="column"
          gap="lg"
          onSubmit={function handleSubmit(event) {
            event.preventDefault();
          }}
        >
          <Heading level={2}>{signInCopy.title}</Heading>
          <Text>{signInCopy.description}</Text>
          <SignInFields />
          <Button type="submit" variant="primary">
            {signInCopy.submitLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
`},{path:`data/copy.ts`,language:`ts`,source:`export const signInCopy = {
  title: 'Sign in to your account',
  description: 'Use your email and password to continue.',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Sign in'
} as const;
`},{path:`index.tsx`,language:`tsx`,source:`export { SignInForm } from './components/sign-in-form';
`}]},children:(0,g.jsx)(r,{of:u,inline:!0})})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),o(),c(),a(),s(),d(),p()}))();export{h as default};