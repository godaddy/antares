'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { GalleryLimits, ImageItem } from '../data/types';

export const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MiB = 1024 * 1024;
export const defaultLimits: Required<GalleryLimits> = { maxFiles: 50, maxFileSize: 256 * MiB, maxTotalSize: 256 * MiB };

/** Hashing is optional; an unreadable file still fails independently of the rest of its batch. */
async function contentKey(file: File) {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  const bytes = await file.arrayBuffer();
  try {
    const digest = await subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

/** Owns local resources, serialized ingestion, and the image collection independently of its presentation. */
export function useGalleryImages(
  initialImages: ImageItem[],
  limits: Required<GalleryLimits>,
  onImagesChange?: (images: ImageItem[]) => void
) {
  const [images, setImages] = useState(() => [...initialImages]);
  const collection = useRef(images);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [processing, setProcessing] = useState<{ completed: number; total: number } | null>(null);
  const progress = useRef({ completed: 0, total: 0 });
  const mounted = useRef(false);
  const instanceId = useId();
  const counter = useRef(0);
  const owned = useRef(new Map<string, { id: string; url: string }>());
  const keys = useRef(new Map<string, string>());
  const queue = useRef(Promise.resolve());
  const callback = useRef(onImagesChange);
  callback.current = onImagesChange;
  const previous = useRef(images);

  useEffect(
    function notifyCollectionChange() {
      if (previous.current !== images) {
        previous.current = images;
        callback.current?.([...images]);
      }
    },
    [images]
  );

  useEffect(function manageResources() {
    mounted.current = true;
    const urls = owned.current;
    const ids = keys.current;
    return function releaseResources() {
      mounted.current = false;
      for (const { url } of urls.values()) URL.revokeObjectURL(url);
      urls.clear();
      ids.clear();
    };
  }, []);

  const updateImages = useCallback(function updateImages(update: (previous: ImageItem[]) => ImageItem[]) {
    collection.current = update(collection.current);
    setImages(collection.current);
  }, []);

  const reportError = useCallback(function reportError(message: string) {
    if (mounted.current) setError((previous) => (previous ? `${previous} ${message}` : message));
  }, []);

  const addFiles = useCallback(
    function addFiles(list: FileList | File[] | null) {
      const files = Array.from(list ?? []);
      if (!mounted.current || !files.length) return Promise.resolve();
      progress.current.total += files.length;
      setProcessing({ ...progress.current });

      const process = async function processFiles() {
        if (!mounted.current) return;
        let added = 0;
        let duplicates = 0;
        let invalid = 0;
        let overBudget = 0;
        let unreadable = 0;
        for (const file of files) {
          if (!mounted.current) return;
          try {
            if (!acceptedTypes.includes(file.type) || file.size >= limits.maxFileSize) {
              invalid++;
              continue;
            }
            const totalBytes = collection.current.reduce((total, image) => total + (image.size ?? 0), 0);
            if (collection.current.length >= limits.maxFiles || totalBytes + file.size > limits.maxTotalSize) {
              overBudget++;
              continue;
            }
            const hash = await contentKey(file);
            if (!mounted.current) return;
            const id = `local-${instanceId}-${counter.current++}`;
            const key = hash ? JSON.stringify([file.name, hash]) : `unique:${id}`;
            if (hash && owned.current.has(key)) {
              duplicates++;
              continue;
            }
            const url = URL.createObjectURL(file);
            owned.current.set(key, { id, url });
            keys.current.set(id, key);
            updateImages((previous) => [...previous, { id, name: file.name, size: file.size, src: url }]);
            added++;
          } catch {
            unreadable++;
          } finally {
            progress.current.completed++;
            if (mounted.current) setProcessing({ ...progress.current });
          }
        }
        if (!mounted.current) return;
        const errors = [];
        if (invalid) errors.push(`Use JPG, PNG, GIF, or WebP images smaller than ${limits.maxFileSize / MiB} MiB.`);
        if (overBudget)
          errors.push(`Gallery limit reached: ${limits.maxFiles} images and ${limits.maxTotalSize / MiB} MiB total.`);
        if (unreadable) errors.push('We couldn’t read some images. Please try again.');
        setError(errors.join(' '));
        const messages = [];
        if (added) messages.push(`${added} ${added === 1 ? 'image' : 'images'} added.`);
        if (duplicates) messages.push(`${duplicates} ${duplicates === 1 ? 'duplicate' : 'duplicates'} skipped.`);
        setNotice(messages.join(' '));
      };
      const pending = queue.current.then(process);
      queue.current = pending
        .catch(function failedBatch() {
          reportError('We couldn’t read these images. Please try again.');
        })
        .finally(function finishBatch() {
          if (progress.current.completed === progress.current.total) {
            progress.current = { completed: 0, total: 0 };
            if (mounted.current) setProcessing(null);
          }
        });
      return queue.current;
    },
    [instanceId, limits.maxFiles, limits.maxFileSize, limits.maxTotalSize, reportError, updateImages]
  );

  const removeImage = useCallback(
    function removeImage(image: ImageItem) {
      const key = keys.current.get(image.id);
      const entry = key ? owned.current.get(key) : undefined;
      if (key && entry) {
        URL.revokeObjectURL(entry.url);
        owned.current.delete(key);
        keys.current.delete(image.id);
      }
      updateImages((previous) => previous.filter((item) => item.id !== image.id));
      setNotice(`${image.name} removed.`);
    },
    [updateImages]
  );

  const retryImage = useCallback(
    function retryImage(image: ImageItem) {
      updateImages((previous) =>
        previous.map((item) => (item.id === image.id ? { ...item, status: 'loading', errorMessage: undefined } : item))
      );
      setNotice(`${image.name} is retrying.`);
    },
    [updateImages]
  );

  const markReady = useCallback(
    function markReady(id: string) {
      updateImages((previous) =>
        previous.map((item) => (item.id === id ? { ...item, status: 'ready', errorMessage: undefined } : item))
      );
      setNotice('Image is ready to view.');
    },
    [updateImages]
  );

  const markError = useCallback(
    function markError(id: string) {
      updateImages((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status: 'error', errorMessage: `Couldn’t load ${item.name}.` } : item
        )
      );
      setNotice('Image failed to load.');
    },
    [updateImages]
  );

  return { images, error, notice, processing, addFiles, removeImage, retryImage, markReady, markError, reportError };
}
