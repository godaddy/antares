import { forwardRef, type ReactNode } from 'react';
import { Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface LinkProps extends Omit<RACLinkProps, 'children'> {
  /** Whether the destination opens in a new tab. */
  isExternal?: boolean;

  /** Link contents. */
  children?: ReactNode;
}

/** A text link that preserves native anchor navigation and browser gestures. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { children, className, isExternal, target, rel, ...rest } = props;

  return (
    <RACLink
      {...rest}
      ref={ref}
      target={isExternal ? (target ?? '_blank') : target}
      rel={isExternal ? (rel ?? 'noopener noreferrer') : rel}
      className={composeClassName(className, styles.link)}
    >
      {children}
    </RACLink>
  );
});
