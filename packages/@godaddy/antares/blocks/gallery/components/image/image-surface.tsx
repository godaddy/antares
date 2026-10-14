'use client';

import { forwardRef, useCallback, useEffect, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, Image } from '@godaddy/antares';
import styles from './image-surface.module.css';

type ImageLoadState = 'loading' | 'ready' | 'error';

interface UseImageLoadStateOptions {
  /** Resets the resource when the owning image changes state. */
  resetKey?: string;

  /** Called after the image loads successfully. */
  onLoad?: () => void;

  /** Called after the image fails to load. */
  onError?: () => void;
}

/** Shares image loading, retry, and complete-image handling across Gallery surfaces. */
export function useImageLoadState(
  src: string,
  { resetKey = '', onLoad: reportLoad, onError: reportError }: UseImageLoadStateOptions = {}
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');
  const reportedErrorKey = useRef<string | null>(null);
  const reportedLoadKey = useRef<string | null>(null);
  const loadKey = `${src}:${resetKey}:${attempt}`;

  const reportLoadOnce = useCallback(
    function reportLoadedResource() {
      if (reportedLoadKey.current === loadKey) return;

      reportedLoadKey.current = loadKey;
      reportLoad?.();
    },
    [loadKey, reportLoad]
  );

  const reportErrorOnce = useCallback(
    function reportFailedResource() {
      if (reportedErrorKey.current === loadKey) return;

      reportedErrorKey.current = loadKey;
      reportError?.();
    },
    [loadKey, reportError]
  );

  useEffect(
    function resetImageState() {
      setAttempt(0);
      setState('loading');
    },
    [resetKey, src]
  );

  const imageRef = useCallback(
    function inspectLoadedImage(element: HTMLImageElement | null) {
      if (!element?.complete) return;

      if (element.naturalWidth > 0) {
        setState('ready');
        reportLoadOnce();
      } else {
        setState('error');
        reportErrorOnce();
      }
    },
    [reportErrorOnce, reportLoadOnce]
  );

  const onLoad = useCallback(
    function handleLoad() {
      setState('ready');
      reportLoadOnce();
    },
    [reportLoadOnce]
  );

  const onError = useCallback(
    function handleError() {
      setState('error');
      reportErrorOnce();
    },
    [reportErrorOnce]
  );

  const retry = useCallback(function retryImage() {
    setAttempt(function increment(value) {
      return value + 1;
    });
    setState('loading');
  }, []);

  return { attempt, imageRef, onLoad, onError, retry, src, state };
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
