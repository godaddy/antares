import type React from 'react';
import { createContext, forwardRef } from 'react';
import { cva, type VariantProps } from 'cva';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  useContextProps,
  type ContextValue
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

/** Lets a parent publish Antares button props (and slots). Optional. */
export const ButtonContext = createContext<ContextValue<ButtonProps, HTMLButtonElement>>(null);

/**
 * The Button component allows users to trigger an action.
 * Parents may publish props through {@link ButtonContext}; local props win.
 * RAC still owns press behavior via its own button context.
 *
 * @param props - The properties {@link ButtonProps} passed to the component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  const { variant, size, className, children, isDisabled, ...rest } = props;
  const content = typeof children === 'string' ? <Text slot={null}>{children}</Text> : children;

  return (
    <RACButton
      {...rest}
      ref={ref}
      isDisabled={isDisabled}
      className={composeClassName(className, buttonVariants({ variant, size }))}
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
