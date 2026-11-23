'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  Button,
  Carousel,
  Box,
  CloseButton,
  Content,
  Flex,
  Heading,
  Icon,
  CardGroup,
  Card,
  ListLayout,
  Modal,
  Pagination,
  Text,
  Virtualizer,
  type CardGroupProps
} from '@godaddy/antares';
import { GalleryImage } from '../image';
import type { ImageItem } from '../../data/types';
import styles from './index.module.css';

const thumbnailLayoutOptions = {
  orientation: 'horizontal' as const,
  rowSize: 80,
  gap: 8,
  padding: 4
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
  const activeThumbnail = useRef<HTMLElement>(null);
  const thumbnailViewport = useRef<HTMLDivElement>(null);
  const index = images.findIndex(function findActiveImage(image) {
    return image.id === activeId;
  });
  const image = images[index];

  const registerActiveThumbnail = useCallback(function registerActiveThumbnail(element: HTMLElement | null) {
    activeThumbnail.current = element;
    element?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, []);

  useEffect(
    function revealActiveThumbnail() {
      if (index < 0) return;
      const scrollport = thumbnailViewport.current?.querySelector<HTMLElement>('[role="grid"]');
      if (!(scrollport instanceof HTMLElement)) return;

      const itemStart =
        thumbnailLayoutOptions.padding + index * (thumbnailLayoutOptions.rowSize + thumbnailLayoutOptions.gap);
      const maxScrollLeft = Math.max(0, scrollport.scrollWidth - scrollport.clientWidth);
      const offset = Math.min(itemStart, maxScrollLeft);
      // Horizontal scrollports measure from the start edge, which is negative in RTL.
      scrollport.scrollLeft = getComputedStyle(scrollport).direction === 'rtl' ? -offset : offset;
    },
    [index]
  );

  const focusActiveThumbnail = useCallback(function focusActiveThumbnail() {
    activeThumbnail.current?.focus({ preventScroll: true });
  }, []);

  const handleOpenChange = useCallback(
    function handleOpenChange(open: boolean) {
      if (!open) onClose();
    },
    [onClose]
  );

  const handlePageChange = useCallback(
    function handlePageChange(page: number) {
      const nextImage = images[page - 1];
      if (nextImage) onSelectImage(nextImage.id);
    },
    [images, onSelectImage]
  );

  const handleCarouselChange = useCallback(
    function handleCarouselChange(nextIndex: number) {
      const nextImage = images[nextIndex];
      if (nextImage && nextImage.id !== activeId) onSelectImage(nextImage.id);
    },
    [activeId, images, onSelectImage]
  );

  const handleThumbnailSelection = useCallback<NonNullable<CardGroupProps<ImageItem>['onSelectionChange']>>(
    function handleThumbnailSelection(keys) {
      if (keys === 'all') return;
      const id = keys.values().next().value;
      if (typeof id === 'string' && id !== activeId) onSelectImage(id);
    },
    [activeId, onSelectImage]
  );

  if (!image) return null;

  return (
    <Modal
      isOpen
      lang="en-US"
      aria-label="Media gallery"
      onOpenChange={handleOpenChange}
      containerProps={{ className: styles.modalContainer }}
      className={styles.modal}
    >
      <Heading slot="title" level={2}>
        Media gallery
      </Heading>
      <CloseButton aria-label="Close gallery" />
      <Content>
        <Carousel
          activeIndex={index}
          onChange={handleCarouselChange}
          hideDots
          hideNavigationControls
          hideMaskEdges
          emblaAccessibilityOptions={{ carouselAriaLabel: 'Gallery images', announceChanges: false }}
        >
          {images.map(function renderSlide(slideImage, slideIndex) {
            return (
              <Flex key={slideImage.id} alignItems="center" justifyContent="center" className={styles.slide}>
                {Math.abs(slideIndex - index) <= 1 ? (
                  <GalleryImage
                    image={slideImage}
                    variant="viewer"
                    loading={slideImage.id === activeId ? 'eager' : 'lazy'}
                    onRetryStart={focusActiveThumbnail}
                  />
                ) : (
                  <Box aria-hidden="true" />
                )}
              </Flex>
            );
          })}
        </Carousel>
        <Flex justifyContent="space-between" alignItems="center" gap="sm">
          <Text className={styles.name} maxLines={1} wrap="nowrap" role="status" aria-atomic="true">
            {image.name} · {(index + 1).toLocaleString('en-US')} of {images.length.toLocaleString('en-US')}
          </Text>
          <Pagination
            value={index + 1}
            pageCount={images.length}
            onChange={handlePageChange}
            aria-label="Gallery images"
            gap="xs"
            flexShrink={0}
          >
            <Button slot="previous" variant="secondary" aria-label="Previous image">
              <Icon icon="chevron-left" aria-hidden="true" />
            </Button>
            <Button slot="next" variant="secondary" aria-label="Next image">
              <Icon icon="chevron-right" aria-hidden="true" />
            </Button>
          </Pagination>
        </Flex>
        <Box ref={thumbnailViewport} className={styles.thumbnailViewport}>
          <Virtualizer layout={ListLayout} layoutOptions={thumbnailLayoutOptions}>
            <CardGroup
              items={images}
              dependencies={[activeId]}
              columns="none"
              rows="max-content"
              autoFlow="column"
              autoColumns="max-content"
              orientation="horizontal"
              gap="0"
              padding="0"
              aria-label="Image thumbnails"
              className={styles.thumbnails}
              style={{ display: 'block', inlineSize: '100%' }}
              selectionMode="single"
              autoFocus
              selectionBehavior="replace"
              escapeKeyBehavior="none"
              disallowEmptySelection
              selectedKeys={activeId ? [activeId] : []}
              onSelectionChange={handleThumbnailSelection}
            >
              {function renderThumbnail(thumbnailImage) {
                return (
                  <Card
                    id={thumbnailImage.id}
                    textValue={thumbnailImage.name}
                    aria-label={`View ${thumbnailImage.name}`}
                    ref={thumbnailImage.id === activeId ? registerActiveThumbnail : undefined}
                    padding="0"
                    gap="0"
                  >
                    <GalleryImage image={thumbnailImage} variant="thumbnail" loading="eager" />
                  </Card>
                );
              }}
            </CardGroup>
          </Virtualizer>
        </Box>
      </Content>
    </Modal>
  );
}
