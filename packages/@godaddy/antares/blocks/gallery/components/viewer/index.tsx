'use client';

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
            label={`View ${thumbnailImage.name}`}
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
          emblaOptions={{ direction: dir, duration: 0 }}
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
