'use client';

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
