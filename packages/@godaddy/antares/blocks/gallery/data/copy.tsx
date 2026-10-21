'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

/** Copy shared by the collection, file actions, ingestion feedback, and viewer. */
function createGalleryCopy(locale: string) {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const format = (value: number) => number.format(value);
  return {
    gallery: 'Gallery',
    imageCount: (count: number) => `${format(count)} ${count === 1 ? 'image' : 'images'}`,
    addFilesRegion: 'Add files to gallery',
    addFiles: 'Add files',
    dragHint: 'or drag them here.',
    dropFiles: 'Drop files to upload.',
    layout: 'Layout',
    list: 'List',
    grid: 'Grid',
    listView: 'List view',
    gridView: 'Grid view',
    files: 'Gallery files',
    imageGrid: 'Gallery image grid',
    updates: 'Gallery updates',
    processingImages: 'Processing images',
    processedFiles: (completed: number, total: number) => `${format(completed)} of ${format(total)} files processed`,
    emptyGallery: 'Empty gallery',
    startGallery: 'Start your gallery',
    emptyDescription: 'Drop images here or choose Add files above to upload.',
    loadingImage: 'Loading image…',
    loadingPreview: (name: string) => `Loading ${name}`,
    openImage: (name: string) => `Open ${name}`,
    viewImage: (name: string) => `View ${name}`,
    removeImage: (name: string) => `Remove ${name}`,
    retryImage: (name: string) => `Retry ${name}`,
    retryPreview: (name: string) => `Retry image preview for ${name}`,
    retry: 'Retry',
    failedImage: (name: string) => `Couldn’t load ${name}.`,
    failedThumbnail: (name: string) => `${name} failed to load`,
    needsAttention: 'File needs attention.',
    sizeUnavailable: 'Size unavailable',
    mediaGallery: 'Media gallery',
    closeGallery: 'Close gallery',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    galleryImages: 'Gallery images',
    thumbnails: 'Image thumbnails',
    imagePosition: (name: string, current: number, total: number) => `${name} · ${format(current)} of ${format(total)}`,
    showAll: 'Show all',
    fileCount: (visible: number, total: number) => `${format(visible)} of ${format(total)} files`,
    filesNeedAttention: (count: number) => `${format(count)} file${count === 1 ? ' needs' : 's need'} attention.`,
    invalidFiles: (maxMiB: number) => `Use JPG, PNG, GIF, or WebP images smaller than ${format(maxMiB)} MiB.`,
    limitReached: (maxFiles: number, maxMiB: number) =>
      `Gallery limit reached: ${format(maxFiles)} images and ${format(maxMiB)} MiB total.`,
    unreadableDrop: 'Some dropped files couldn’t be read. Please select them again.',
    unreadableImages: 'We couldn’t read some images. Please try again.',
    unreadableBatch: 'We couldn’t read these images. Please try again.',
    addedImages: (count: number) => `${format(count)} ${count === 1 ? 'image' : 'images'} added.`,
    skippedDuplicates: (count: number) => `${format(count)} ${count === 1 ? 'duplicate' : 'duplicates'} skipped.`,
    removedImage: (name: string) => `${name} removed.`,
    retryingImage: (name: string) => `${name} is retrying.`,
    imageReady: 'Image is ready to view.',
    imageFailed: 'Image failed to load.'
  };
}

/** Override individual messages, including action names and live announcements. */
export type GalleryMessages = ReturnType<typeof createGalleryCopy>;

const defaultCopy = {
  locale: 'en-US',
  messages: createGalleryCopy('en-US'),
  number: new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
};
const GalleryCopyContext = createContext(defaultCopy);

/** Keeps translated copy and regional formatting consistent, including portaled viewer content. */
export function GalleryCopyProvider({
  locale = 'en-US',
  messages,
  children
}: {
  locale?: string;
  messages?: Partial<GalleryMessages>;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      locale,
      messages: { ...createGalleryCopy(locale), ...messages },
      number: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 })
    }),
    [locale, messages]
  );
  return <GalleryCopyContext.Provider value={value}>{children}</GalleryCopyContext.Provider>;
}

/** Reads the gallery's copy without threading it through every presentation component. */
export function useGalleryCopy() {
  return useContext(GalleryCopyContext);
}
