import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { cx } from 'cva';
import { Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components';
import styles from './index.module.css';

export type AvatarShape = 'circle' | 'square';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarFigure = `figure${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}`;

export type AvatarEmphasis = 'primary' | 'subtle' | AvatarFigure;

type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarContextValue {
  shape: AvatarShape;
  size: AvatarSize;
  emphasis: AvatarEmphasis;
  loadingStatus: AvatarLoadingStatus;
  setLoadingStatus: (status: AvatarLoadingStatus) => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext(partName: string) {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error(`${partName} must be rendered inside an Avatar.`);
  }

  return context;
}

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Circle identifies a person; square identifies a business, workspace, or account. @default 'circle' */
  shape?: AvatarShape;

  /** Avatar diameter. @default 'md' */
  size?: AvatarSize;

  /**
   * Surface style. Use `primary` for standard identity, `subtle` for a quieter treatment,
   * or `figure0` through `figure14` to categorize entities.
   * @default 'primary'
   */
  emphasis?: AvatarEmphasis;

  /** Accessible name for the avatar, such as the person or organization name. */
  'aria-label'?: string;

  /** AvatarImage and/or AvatarFallback children. */
  children?: ReactNode;

  /** Additional class names applied to the avatar surface. */
  className?: string;
}

/**
 * A compact, non-interactive visual identifier for a person or organization.
 *
 * Compose AvatarImage and AvatarFallback to provide image loading and fallback content.
 *
 * @example
 * <Avatar>
 *   <AvatarImage src="/jamie.jpg" alt="Jamie Rivera" />
 *   <AvatarFallback>JR</AvatarFallback>
 * </Avatar>
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(props, ref) {
  const { shape = 'circle', size = 'md', emphasis = 'primary', className, children, ...rest } = props;
  const [loadingStatus, setLoadingStatus] = useState<AvatarLoadingStatus>('idle');
  const setStatus = useCallback(function setStatus(status: AvatarLoadingStatus) {
    setLoadingStatus(status);
  }, []);

  return (
    <AvatarContext.Provider value={{ shape, size, emphasis, loadingStatus, setLoadingStatus: setStatus }}>
      <span
        {...rest}
        ref={ref}
        data-emphasis={emphasis}
        data-loading-status={loadingStatus}
        data-shape={shape}
        data-size={size}
        className={cx(styles.avatar, className)}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
});

export interface AvatarImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  /** Image source URL. */
  src?: string;

  /** Alternative text that describes the avatar image. */
  alt?: string;

  /** Additional class names applied to the image. */
  className?: string;
}

/**
 * The image content for an Avatar. It remains hidden until it has loaded; AvatarFallback
 * is shown meanwhile and after an image error.
 */
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(props, ref) {
  const { className, src, onLoad, onError, ...rest } = props;
  const { setLoadingStatus } = useAvatarContext('AvatarImage');
  const imageRef = useRef<HTMLImageElement | null>(null);
  const setImageRef = useCallback(
    function setImageRef(node: HTMLImageElement | null) {
      imageRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  useEffect(
    function synchronizeImageStatus() {
      const image = imageRef.current;

      if (!src) {
        setLoadingStatus('idle');
      } else if (image?.complete) {
        setLoadingStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
      } else {
        setLoadingStatus('loading');
      }
    },
    [setLoadingStatus, src]
  );

  return (
    <img
      {...rest}
      ref={setImageRef}
      src={src}
      className={cx(styles.image, className)}
      onLoad={function handleLoad(event) {
        setLoadingStatus('loaded');
        onLoad?.(event);
      }}
      onError={function handleError(event) {
        setLoadingStatus('error');
        onError?.(event);
      }}
    />
  );
});

export interface AvatarFallbackProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  /** Monogram, icon, or other fallback content. */
  children?: ReactNode;

  /** Additional class names applied to the fallback content. */
  className?: string;
}

/**
 * Fallback content displayed until AvatarImage loads or when no image is available.
 */
export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(function AvatarFallback(props, ref) {
  const { className, children, ...rest } = props;
  useAvatarContext('AvatarFallback');

  return (
    <span {...rest} ref={ref} className={cx(styles.fallback, className)}>
      {children}
    </span>
  );
});

type AvatarButtonAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string };

export type AvatarButtonProps = Omit<RACButtonProps, 'children' | 'className'> &
  AvatarButtonAccessibleName & {
    /** Whether the button has the selected (chosen) ring. @default false */
    isSelected?: boolean;

    /** Avatar subtree to make interactive. */
    children: ReactNode;

    /** Additional class names applied to the button. */
    className?: string;
  };

/**
 * An accessible interactive wrapper for an Avatar.
 *
 * Use inside MenuTrigger when the avatar opens an account or profile menu.
 */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(function AvatarButton(props, ref) {
  const { className, children, isSelected = false, ...rest } = props;

  return (
    <RACButton {...rest} ref={ref} data-selected={isSelected || undefined} className={cx(styles.button, className)}>
      {children}
    </RACButton>
  );
});
