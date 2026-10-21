'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
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
  Modal,
  Pagination,
  Text,
  type CardGroupProps
} from '@godaddy/antares';
import { GalleryImage } from '../image';
import type { ImageItem } from '../../data/types';
import { useGalleryCopy } from '../../data/copy';
import styles from './index.module.css';

type PropagatingKeyboardEvent<T extends Element> = KeyboardEvent<T> & {
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
  const { locale, messages } = useGalleryCopy();
  const strip = useRef<HTMLDivElement>(null);
  const thumbnails = useRef(new Map<string, HTMLElement>());
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const focusCurrentThumbnail = useRef(false);
  const index = images.findIndex(function findActiveImage(image) {
    return image.id === activeId;
  });
  const image = images[index];

  const focusActiveThumbnail = useCallback(
    function focusActiveThumbnail() {
      const thumbnail = activeId ? thumbnails.current.get(activeId) : undefined;
      (thumbnail ?? closeButton.current)?.focus({ preventScroll: true });
    },
    [activeId]
  );

  useEffect(
    function revealCurrentThumbnail() {
      const thumbnail = activeId ? thumbnails.current.get(activeId) : undefined;
      const rail = strip.current;
      if (thumbnail && rail) {
        const target = thumbnail.getBoundingClientRect();
        const bounds = rail.getBoundingClientRect();
        // Reveal horizontally without scrolling the modal or the page behind it.
        if (target.left < bounds.left) rail.scrollBy({ left: target.left - bounds.left });
        else if (target.right > bounds.right) rail.scrollBy({ left: target.right - bounds.right });
      }
      if (focusCurrentThumbnail.current) {
        (thumbnail ?? closeButton.current)?.focus({ preventScroll: true });
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
    function navigate(event: KeyboardEvent<HTMLElement>) {
      // The CardGroup owns its arrow, Home, End, and typeahead navigation.
      if (strip.current?.contains(event.target as Node)) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Home') move(-index);
        else if (event.key === 'End') move(images.length - 1 - index);
        else move((event.key === 'ArrowLeft' ? -1 : 1) * (dir === 'rtl' ? -1 : 1));
      }
    },
    [dir, images.length, index, move]
  );

  const handleOpenChange = useCallback(
    function handleOpenChange(open: boolean) {
      if (!open) onClose();
    },
    [onClose]
  );

  const handleCloseKeyDown = useCallback(
    function handleCloseKeyDown(event: PropagatingKeyboardEvent<HTMLButtonElement>) {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) navigate(event);
      else event.continuePropagation();
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    function handlePageChange(page: number) {
      move(page - 1 - index);
    },
    [index, move]
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

  const renderSlide = useCallback(
    function renderSlide(slideImage: ImageItem, slideIndex: number) {
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
    },
    [activeId, focusActiveThumbnail, index]
  );

  const renderThumbnail = useCallback(
    function renderThumbnail(thumbnailImage: ImageItem) {
      return (
        <Card
          id={thumbnailImage.id}
          textValue={thumbnailImage.name}
          aria-label={messages.viewImage(thumbnailImage.name)}
          ref={function registerThumbnail(element) {
            if (element) thumbnails.current.set(thumbnailImage.id, element);
            else thumbnails.current.delete(thumbnailImage.id);
          }}
          padding="0"
          gap="0"
        >
          <GalleryImage image={thumbnailImage} variant="thumbnail" />
        </Card>
      );
    },
    [messages]
  );

  if (!image) return null;

  return (
    <Modal
      isOpen
      dir={dir}
      lang={locale}
      aria-label={messages.mediaGallery}
      onOpenChange={handleOpenChange}
      containerProps={{ className: styles.modalContainer }}
      className={styles.modal}
    >
      <Heading slot="title" level={2}>
        {messages.mediaGallery}
      </Heading>
      <CloseButton ref={closeButton} aria-label={messages.closeGallery} onKeyDown={handleCloseKeyDown} />
      <Content onKeyDownCapture={navigate}>
        <Carousel
          activeIndex={index}
          onChange={handleCarouselChange}
          hideDots
          hideNavigationControls
          hideMaskEdges
          emblaOptions={{ direction: dir }}
          emblaAccessibilityOptions={{ carouselAriaLabel: messages.galleryImages, announceChanges: false }}
        >
          {images.map(renderSlide)}
        </Carousel>
        <Flex justifyContent="space-between" alignItems="center" gap="sm">
          <Text className={styles.name} maxLines={1} wrap="nowrap" role="status" aria-atomic="true">
            {messages.imagePosition(image.name, index + 1, images.length)}
          </Text>
          <Pagination
            value={index + 1}
            pageCount={images.length}
            onChange={handlePageChange}
            aria-label={messages.galleryImages}
            gap="xs"
            flexShrink={0}
          >
            <Button ref={previousButton} slot="previous" variant="secondary" aria-label={messages.previousImage}>
              <Icon icon={dir === 'rtl' ? 'chevron-right' : 'chevron-left'} aria-hidden="true" />
            </Button>
            <Button ref={nextButton} slot="next" variant="secondary" aria-label={messages.nextImage}>
              <Icon icon={dir === 'rtl' ? 'chevron-left' : 'chevron-right'} aria-hidden="true" />
            </Button>
          </Pagination>
        </Flex>
        <CardGroup
          ref={strip}
          items={images}
          columns="none"
          rows="max-content"
          autoFlow="column"
          autoColumns="max-content"
          orientation="horizontal"
          gap="md"
          padding="sm"
          aria-label={messages.thumbnails}
          className={styles.thumbnails}
          selectionMode="single"
          autoFocus
          selectionBehavior="replace"
          escapeKeyBehavior="none"
          disallowEmptySelection
          selectedKeys={activeId ? [activeId] : []}
          onSelectionChange={handleThumbnailSelection}
        >
          {renderThumbnail}
        </CardGroup>
      </Content>
    </Modal>
  );
}
