import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { cx } from 'cva';
import { Button as RACButton, Provider, TextContext, type ButtonProps as RACButtonProps } from 'react-aria-components';
import { ImageContext } from '#components/image';
import styles from './index.module.css';

export type AvatarShape = 'circle' | 'square';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarFigure = `figure${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}`;

export type AvatarEmphasis = 'primary' | 'subtle' | AvatarFigure;

type AvatarImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

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
 * A compact, non-interactive visual identifier for a person or organization.
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

  useLayoutEffect(
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
    <Provider
      values={[
        [
          ImageContext,
          {
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
    </Provider>
  );
});

type AvatarButtonAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string };

/** Props for the AvatarButton component. */
export type AvatarButtonProps = Omit<RACButtonProps, 'children' | 'className'> &
  AvatarButtonAccessibleName & {
    /** Avatar subtree to make interactive, typically an Avatar. */
    children: ReactNode;

    /** Additional class names applied to the button. */
    className?: string;
  };

/**
 * An accessible interactive wrapper for an Avatar.
 *
 * Use inside MenuTrigger when the avatar opens an account or profile menu.
 * MenuTrigger applies the open treatment automatically through `aria-expanded`.
 *
 * @param props - {@link AvatarButtonProps}
 */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(function AvatarButton(props, ref) {
  const { className, children, ...rest } = props;

  return (
    <RACButton {...rest} ref={ref} className={cx(styles.button, className)}>
      {children}
    </RACButton>
  );
});
