'use client';

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
}

const MAX_VISIBLE_ITEMS = 5;

/** Horizontal file list with counter and error banner. */
export function ListView({ images, onOpen, onRemove, onRetry, onLoadError, onLoadSuccess }: ListViewProps) {
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
