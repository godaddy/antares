'use client';

import { forwardRef, useCallback, useRef, useState, type ReactEventHandler } from 'react';
import { Box, Button, Flex, Icon, Image, Text } from '@godaddy/antares';
import type { ImageItem } from '../../data/types';
import { useGalleryCopy } from '../../data/copy';
import styles from './index.module.css';

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
function useImageLoadState(
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
}

/** Renders the shared image element; its owner supplies any interaction. */
const ImageSurface = forwardRef<HTMLImageElement, ImageSurfaceProps>(function ImageSurface(
  { src, srcSet, sizes, width, height, alt, variant, className, loading = 'lazy', onLoad, onError },
  ref
) {
  return (
    <Box
      as={Image}
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={className}
      data-variant={variant}
      rounding="md"
      loading={loading}
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  );
});

/** Cover geometry used by Gallery's list and grid presentations. */
export type FileCoverVariant = 'horizontal' | 'vertical';

interface FileCoverProps {
  /** File represented by the cover. */
  image: ImageItem;

  /** Cover geometry used by the parent presentation. */
  variant: FileCoverVariant;

  /** Reports an image decode or network failure to the owning gallery. */
  onLoadError?: (id: string) => void;

  /** Reports a successful retry to the owning gallery. */
  onLoadSuccess?: (id: string) => void;
}

/** A small, reusable image/error surface shared by every Gallery presentation. */
export function FileCover({ image, variant, onLoadError, onLoadSuccess }: FileCoverProps) {
  const { messages } = useGalleryCopy();
  const [failedThumbnail, setFailedThumbnail] = useState<string | null>(null);
  const thumbnail = image.thumbnailSrc && failedThumbnail !== image.thumbnailSrc ? image.thumbnailSrc : undefined;
  const reportLoadError = useCallback(
    function reportLoadError() {
      if (thumbnail && thumbnail !== image.src) setFailedThumbnail(thumbnail);
      else onLoadError?.(image.id);
    },
    [thumbnail, image.src, image.id, onLoadError]
  );
  const reportLoadSuccess = useCallback(
    function reportLoadSuccess() {
      onLoadSuccess?.(image.id);
    },
    [image.id, onLoadSuccess]
  );
  const { state, imageRef, onLoad, onError } = useImageLoadState(thumbnail ?? image.src, {
    resetKey: `${image.id}:${image.status ?? ''}`,
    onLoad: reportLoadSuccess,
    onError: reportLoadError
  });
  const hasError = image.status === 'error' || state === 'error';
  return hasError ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      role="img"
      aria-label={`${image.name}: ${image.errorMessage ?? messages.needsAttention}`}
      rounding="md"
      className={`${styles.surface} ${styles.error}`}
      data-variant={variant}
    >
      <Icon icon="alert" aria-hidden="true" />
    </Flex>
  ) : (
    <ImageSurface
      ref={imageRef}
      src={thumbnail ?? image.src}
      srcSet={thumbnail ? undefined : image.srcSet}
      sizes={thumbnail ? undefined : image.sizes}
      width={thumbnail ? undefined : image.width}
      height={thumbnail ? undefined : image.height}
      alt={image.alt ?? image.name}
      className={styles.surface}
      variant={variant}
      loading="lazy"
      onLoad={onLoad}
      onError={onError}
    />
  );
}

interface GalleryImageProps {
  /** Image to load; remount this component when its identity changes. */
  image: ImageItem;

  /** Presentation size for the image. */
  variant?: 'default' | 'viewer' | 'thumbnail';

  /** Loading strategy for the image resource. */
  loading?: 'eager' | 'lazy';

  /** Moves focus to a stable viewer control before the retry button disappears. */
  onRetryStart?: () => void;
}

/** Handles image loading failures without simulating an upload. */
export function GalleryImage({ image, variant = 'default', loading = 'lazy', onRetryStart }: GalleryImageProps) {
  const { messages } = useGalleryCopy();
  const { attempt, imageRef, onError, onLoad, retry, src, state } = useImageLoadState(
    variant === 'thumbnail' ? (image.thumbnailSrc ?? image.src) : image.src,
    {
      resetKey: image.id
    }
  );

  if (state === 'error' && variant !== 'thumbnail') {
    return (
      <Flex direction="column" gap="xs" padding="sm" role="alert">
        <Icon icon="alert" aria-hidden="true" />
        <Text emphasis="critical">{messages.failedImage(image.name)}</Text>
        <Button
          variant="inline"
          aria-label={messages.retryImage(image.name)}
          onPress={function handleRetry() {
            onRetryStart?.();
            retry();
          }}
        >
          {messages.retry}
        </Button>
      </Flex>
    );
  }

  const picture =
    state === 'error' ? (
      <Flex
        alignItems="center"
        justifyContent="center"
        className={`${styles.image} ${styles.errorSurface}`}
        data-variant={variant}
        role="img"
        aria-label={messages.failedThumbnail(image.name)}
      >
        <Icon icon="alert" aria-hidden="true" />
      </Flex>
    ) : (
      <ImageSurface
        ref={imageRef}
        key={attempt}
        src={src}
        alt={variant === 'thumbnail' ? '' : (image.alt ?? image.name)}
        srcSet={variant === 'thumbnail' ? undefined : image.srcSet}
        sizes={variant === 'thumbnail' ? undefined : image.sizes}
        width={variant === 'thumbnail' ? 80 : image.width}
        height={variant === 'thumbnail' ? 60 : image.height}
        className={styles.image}
        variant={variant}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
      />
    );

  return (
    <Flex
      direction="column"
      gap="xs"
      aria-busy={state === 'loading'}
      className={styles.container}
      data-variant={variant}
    >
      {picture}
      {state === 'loading' && variant !== 'thumbnail' ? (
        <Text className={variant === 'viewer' ? styles.loading : undefined}>{messages.loadingImage}</Text>
      ) : null}
    </Flex>
  );
}
