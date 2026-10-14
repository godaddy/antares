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
  if (uuid) return `local-${uuid}`;

  const random = new Uint32Array(2);
  globalThis.crypto?.getRandomValues?.(random);
  return `local-${Date.now()}-${localImageCounter++}-${random[0]}-${random[1]}`;
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
      const key = contentKey ? JSON.stringify([file.name, contentKey]) : `unique:${id}`;
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
      messages.push(`${added.length} ${pluralize(added.length, 'image', 'images')} added.`);
    }
    if (duplicates > 0) {
      messages.push(`${duplicates} ${pluralize(duplicates, 'duplicate', 'duplicates')} skipped.`);
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
    setNotice(`${image.name} is retrying.`);
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
        return item.id === id ? { ...item, status: 'error', errorMessage: `Couldn’t load ${item.name}.` } : item;
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
