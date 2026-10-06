'use client';

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

/** Creates a unique ID for a locally added image with a Web Crypto fallback. */
function createLocalImageId() {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) return `local-${uuid}`;

  const random = new Uint32Array(2);
  globalThis.crypto?.getRandomValues?.(random);
  return `local-${Date.now()}-${localImageCounter++}-${random[0]}-${random[1]}`;
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
    if (added.length > 0) messages.push(`${added.length} images added.`);
    if (duplicates > 0) messages.push(`${duplicates} duplicates skipped.`);
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
    setNotice(`${image.name} removed.`);
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
    setNotice(`${image.name} is ready to view.`);
  }, []);

  const handleImageLoadError = useCallback(function handleImageLoadError(id: string) {
    setActiveId(function clearFailedActiveImage(current) {
      return current === id ? null : current;
    });

    setImages(function markImageError(previous) {
      return previous.map(function updateImage(item) {
        return item.id === id ? { ...item, status: 'error', errorMessage: `Couldn’t load ${item.name}.` } : item;
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
                <UploadPrompt ref={addButton} isDropTarget={isDropTarget} error={error} onSelect={addFiles} />
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

            <Box role="region" aria-label={`${view === 'list' ? 'List' : 'Grid'} view`}>
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
