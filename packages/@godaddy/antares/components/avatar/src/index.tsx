import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from 'cva';
import { Provider as RACProvider, TextContext } from 'react-aria-components';
import { ImageContext } from '#components/image';
import styles from './index.module.css';

export type AvatarShape = 'circle' | 'square';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarFigure = `figure${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}`;

export type AvatarEmphasis = 'primary' | 'subtle' | AvatarFigure;

type AvatarImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

// Avoid useLayoutEffect SSR warnings while synchronizing image status before paint in the browser.
const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

/** Props for the Avatar component. */
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-label' | 'color'> {
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

  /** Image content with a Text monogram fallback. */
  children?: ReactNode;

  /** Additional class names applied to the avatar surface. */
  className?: string;
}

/**
 * A visual representation of a user or entity, shown as a photo or a monogram of their initials.
 *
 * Compose Image and Text to provide image loading and fallback content.
 *
 * @example
 * <Avatar>
 *   <Image src="/jamie.jpg" alt="Jamie Rivera" />
 *   <Text>JR</Text>
 * </Avatar>
 *
 * @param props - {@link AvatarProps}
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(props, ref) {
  const { shape = 'circle', size = 'md', emphasis = 'primary', className, children, ...rest } = props;
  const [loadingStatus, setLoadingStatus] = useState<AvatarImageLoadingStatus>('idle');
  const imageRef = useRef<HTMLImageElement | null>(null);
  const setImageRef = useCallback(function setImageRef(node: HTMLImageElement | null) {
    imageRef.current = node;

    if (!node) {
      setLoadingStatus('idle');
    }
  }, []);

  useIsomorphicLayoutEffect(
    function synchronizeImageStatus() {
      const image = imageRef.current;

      if (!image?.src) {
        setLoadingStatus('idle');
      } else if (image.complete) {
        setLoadingStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
      } else {
        setLoadingStatus('loading');
      }
    },
    [children]
  );

  return (
    <RACProvider
      values={[
        [
          ImageContext,
          {
            alt: '',
            className: styles.image,
            ref: setImageRef,
            onLoad: function handleImageLoad() {
              setLoadingStatus('loaded');
            },
            onError: function handleImageError() {
              setLoadingStatus('error');
            }
          }
        ],
        [TextContext, { className: styles.fallback }]
      ]}
    >
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
    </RACProvider>
  );
});
