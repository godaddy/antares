'use client';

import { forwardRef, useCallback, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, type ButtonProps, Image } from '@godaddy/antares';
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

/**
 * Shares image loading and retry across covers, slides, and thumbnails.
 * The ref inspects cached images whose native load event may precede React's handlers.
 * Report each outcome once per resource/attempt: callback refs also run when handlers change.
 */
export function useImageLoadState(
  src: string,
  { resetKey = '', onLoad: reportLoad, onError: reportError }: UseImageLoadStateOptions = {}
) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ImageLoadState>('loading');
  const reportedErrorKey = useRef<string | null>(null);
  const reportedLoadKey = useRef<string | null>(null);
  const resourceKey = JSON.stringify([src, resetKey]);
  const previousResourceKey = useRef(resourceKey);

  if (previousResourceKey.current !== resourceKey) {
    previousResourceKey.current = resourceKey;
    reportedErrorKey.current = null;
    reportedLoadKey.current = null;
    // Reset before the image ref inspects a resource that may already be complete.
    setAttempt(0);
    setState('loading');
  }

  const loadKey = `${resourceKey}:${attempt}`;

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
  /** Resource to display. */
  src: string;

  /** Responsive candidates for the displayed resource. */
  srcSet?: string;

  /** Sizes corresponding to responsive candidates. */
  sizes?: string;

  /** Intrinsic width, when known. */
  width?: number;

  /** Intrinsic height, when known. */
  height?: number;

  /** Keyboard position for an interactive thumbnail. */
  tabIndex?: number;

  /** Keyboard navigation supplied by the viewer. */
  onKeyDown?: NonNullable<ButtonProps['onKeyDown']>;

  /** Image name; decorative inside a separately named action. */
  alt: string;

  /** Presentation variant consumed by the caller's stylesheet. */
  variant?: string;

  /** Styles owned by the calling cover, slide, or thumbnail. */
  className?: string;

  /** Prioritize the active slide; defer offscreen resources. */
  loading?: 'eager' | 'lazy';

  /** Native successful decode notification. */
  onLoad?: ReactEventHandler<HTMLImageElement>;

  /** Native decode or network error notification. */
  onError?: ReactEventHandler<HTMLImageElement>;

  /** Optional activation wrapper for a viewable image. */
  onOpen?: () => void;

  /** Name of the image action, including its filename. */
  label?: string;

  /** Marks the active thumbnail without introducing selection semantics. */
  selected?: boolean;
}

/** Renders the shared image element and optional accessible action wrapper. */
export const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  {
    src,
    srcSet,
    sizes,
    width,
    height,
    alt,
    variant,
    className,
    loading = 'lazy',
    onLoad,
    onError,
    onOpen,
    label,
    selected,
    tabIndex,
    onKeyDown
  },
  ref
) {
  const image = (
    <Box
      as={Image}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={onOpen ? '' : alt}
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
      excludeFromTabOrder={tabIndex === -1}
      onKeyDown={onKeyDown}
      className={styles.openButton}
    >
      {image}
    </Button>
  );
});
