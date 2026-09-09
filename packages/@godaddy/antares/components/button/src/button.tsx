import type React from 'react';
import { type Context, forwardRef } from 'react';
import { cva, type VariantProps } from 'cva';
import {
  Button as RACButton,
  ButtonContext as RACButtonContext,
  type ButtonProps as RACButtonProps,
  type ContextValue,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  useSlottedContext
} from 'react-aria-components';
import { Icon } from '#components/icon';
import { Text } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
      critical: styles.critical,
      inline: styles.inline,
      minimal: styles.minimal,
      control: styles.control,
      trigger: styles.trigger
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
type ButtonVariant = ButtonVariantProps['variant'];
type LinkButtonVariant = Exclude<ButtonVariant, 'control' | 'trigger'>;

interface BaseButtonProps<V extends ButtonVariant = ButtonVariant> {
  /** The variant of the button. */
  variant?: V;

  /** The size of the button. */
  size?: ButtonVariantProps['size'];

  /** The content of the button. */
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseButtonProps, Omit<RACButtonProps, 'children' | 'isPending'> {}

export const ButtonContext: Context<ContextValue<RACButtonProps, HTMLButtonElement>> = RACButtonContext;

type ButtonPresentationProps = Pick<ButtonProps, 'variant' | 'size'>;

/** Triggers an action. A parent may publish `variant`/`size` per slot; local props win. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { variant, size, className, children, slot, ...rest } = props;
  const inherited = useSlottedContext(ButtonContext, slot) as ButtonPresentationProps | null | undefined;
  const resolvedVariant = variant ?? inherited?.variant;
  const resolvedSize = size ?? inherited?.size;
  const content = typeof children === 'string' ? <Text slot={null}>{children}</Text> : children;

  return (
    <RACButton
      {...rest}
      ref={ref}
      slot={slot}
      className={composeClassName(className, buttonVariants({ variant: resolvedVariant, size: resolvedSize }))}
    >
      {content}
    </RACButton>
  );
});

export interface LinkButtonProps extends BaseButtonProps<LinkButtonVariant>, Omit<RACLinkProps, 'children'> {
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
      className={composeClassName(className, buttonVariants({ variant, size }))}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
      {isExternal ? <Icon icon="window-new" /> : null}
    </RACLink>
  );
});
