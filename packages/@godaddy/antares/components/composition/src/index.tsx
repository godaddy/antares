import { createContext, forwardRef } from 'react';
import { cx } from 'cva';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import styles from './index.module.css';

/**
 * Shared structural containers (`Content`, `Header`, `Footer`, `ButtonGroup`) for
 * composing a component's interior. Each is a semantic, layout-only container built on
 * `Flex`, so it accepts the same layout props (`direction`, `gap`, `alignItems`, ...).
 *
 * Each owns an optional context: used standalone the container renders with its own
 * structural defaults; placed inside a parent that provides the context (e.g. `Modal`)
 * it adopts that parent's styling. Merge precedence is defaults < parent context <
 * consumer props, via RAC's `useContextProps`.
 */

export interface ContentProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `Content` it renders. Optional. */
export const ContentContext = createContext<ContextValue<ContentProps, HTMLElement>>(null);

/**
 * Generic content region: the primary body of a composed component.
 *
 * @param props - {@link ContentProps}
 */
export const Content = forwardRef<HTMLElement, ContentProps>(function Content(props, ref) {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { className, ...rest } = props;

  return (
    <Flex
      as="section"
      direction="column"
      gap="md"
      flexGrow={1}
      {...rest}
      ref={ref}
      className={cx(styles.content, className)}
    />
  );
});

export interface HeaderProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `Header` it renders. Optional. */
export const HeaderContext = createContext<ContextValue<HeaderProps, HTMLElement>>(null);

/**
 * Generic header region: the top of a composed component (title area, optional trailing
 * close). Defaults to a row that spaces its contents apart.
 *
 * @param props - {@link HeaderProps}
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(props, ref) {
  [props, ref] = useContextProps(props, ref, HeaderContext);

  return (
    <Flex
      as="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="sm"
      {...props}
      ref={ref}
    />
  );
});

export interface FooterProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `Footer` it renders. Optional. */
export const FooterContext = createContext<ContextValue<FooterProps, HTMLElement>>(null);

/**
 * Generic footer region: the bottom of a composed component (secondary content and/or a
 * `ButtonGroup`). Defaults to a row that spaces its contents apart.
 *
 * @param props - {@link FooterProps}
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(props, ref) {
  [props, ref] = useContextProps(props, ref, FooterContext);

  return (
    <Flex
      as="footer"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="md"
      {...props}
      ref={ref}
    />
  );
});

export interface ButtonGroupProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `ButtonGroup` it renders. Optional. */
export const ButtonGroupContext = createContext<ContextValue<ButtonGroupProps, HTMLDivElement>>(null);

/**
 * Generic button cluster: a group of related actions, typically inside a `Footer`.
 * Defaults to an end-aligned, wrapping row (`role="group"`).
 *
 * @param props - {@link ButtonGroupProps}
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(props, ref) {
  [props, ref] = useContextProps(props, ref, ButtonGroupContext);

  return <Flex as="div" direction="row" gap="sm" justifyContent="end" wrap="wrap" {...props} role="group" ref={ref} />;
});
