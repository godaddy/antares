import type React from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'cva';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  Text as RACText
} from 'react-aria-components';
import { Icon } from '#components/icon';
import styles from './index.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
      critical: styles.critical,
      inline: styles.inline,
      minimal: styles.minimal
    },
    size: {
      sm: styles.sm,
      md: styles.md
    }
  },
  defaultVariants: {
    variant: 'tertiary',
    size: 'md'
  }
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface BaseButtonProps {
  /** The variant of the button. */
  variant?: ButtonVariantProps['variant'];

  /** The size of the button. */
  size?: ButtonVariantProps['size'];

  /** Additional class names to apply to the button. */
  className?: string;

  /** The content of the button. */
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseButtonProps, Omit<RACButtonProps, 'className' | 'children' | 'isPending'> {}

/**
 * The Button component allows users to trigger an action.
 *
 * @param props - The properties {@link ButtonProps} passed to the component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { variant, size, className, children, ...rest } = props;

  return (
    <RACButton {...rest} ref={ref} className={buttonVariants({ variant, size, className })}>
      {typeof children === 'string' ? <RACText>{children}</RACText> : children}
    </RACButton>
  );
});

export interface LinkButtonProps extends BaseButtonProps, Omit<RACLinkProps, 'className' | 'children'> {
  /** Whether the link is external. It will show an external icon if true. */
  isExternal?: boolean;
}

/**
 * A LinkButton is a link that looks like a button.
 *
 * @param props - The properties {@link LinkButtonProps} passed to the component.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(props, ref) {
  const { variant, size, className, children, isExternal, ...rest } = props;

  return (
    <RACLink
      {...rest}
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {typeof children === 'string' ? <RACText>{children}</RACText> : children}
      {isExternal ? <Icon icon="window-new" /> : null}
    </RACLink>
  );
});

export interface CloseButtonProps extends ButtonProps {}

/**
 * A Button preset for dismissing an overlay (Modal, Popover, ...).
 *
 * Defaults to `slot="close"`, so it picks up the overlay's close behavior from
 * RAC with no wiring. With no children it renders an `x` icon and an
 * `aria-label="Close"`; pass children (e.g. "Cancel") to render a labelled
 * button that still closes. Any prop can be overridden and handlers chain, so
 * `onPress` runs in addition to the built-in close.
 *
 * @param props - The properties {@link CloseButtonProps} passed to the component.
 *
 * @example
 * ```tsx
 * <CloseButton />
 * <CloseButton variant="secondary">Cancel</CloseButton>
 * ```
 */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(props, ref) {
  const { children, ...rest } = props;
  const hasChildren = children != null;

  return (
    <Button slot="close" aria-label={hasChildren ? undefined : 'Close'} {...rest} ref={ref}>
      {hasChildren ? children : <Icon icon="x" />}
    </Button>
  );
});
