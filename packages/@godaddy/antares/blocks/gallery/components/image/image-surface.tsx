'use client';

import { forwardRef, useCallback, useEffect, useState, type ReactEventHandler } from 'react';
import { Box, Button, Image } from '@godaddy/antares';
import styles from './image-surface.module.css';

type ImageLoadState = 'loading' | 'ready' | 'error';

interface UseImageLoadStateOptions {
  /** Resets the resource when the owning image changes state. */
  resetKey?: string;

  /** Called after the image fails to load. */
  onError?: () => void;
}

/** Shares image loading, retry, and complete-image handling across Gallery surfaces. */
export function useImageLoadState(src: string, { resetKey = '', onError: reportError }: UseImageLoadStateOptions = {}) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');

  useEffect(
    function resetImageState() {
      setAttempt(0);
      setState('loading');
    },
    [resetKey, src]
  );

  const imageRef = useCallback(function inspectLoadedImage(element: HTMLImageElement | null) {
    if (element?.complete) setState(element.naturalWidth > 0 ? 'ready' : 'error');
  }, []);

  const onLoad = useCallback(function handleLoad() {
    setState('ready');
  }, []);

  const onError = useCallback(
    function handleError() {
      setState('error');
      reportError?.();
    },
    [reportError]
  );

  const retry = useCallback(function retryImage() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);

  let resolvedSrc = src;
  if (attempt > 0 && /^https?:/.test(src)) {
    const url = new URL(src);
    url.searchParams.set('gallery-retry', String(attempt));
    resolvedSrc = url.toString();
  }

  return { attempt, imageRef, onLoad, onError, retry, src: resolvedSrc, state };
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
      aria-label={label ?? `Open ${alt}`}
      aria-current={selected ? 'true' : undefined}
      onPress={onOpen}
      className={styles.openButton}
    >
      {image}
    </Button>
  );
});
