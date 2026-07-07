import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import {
  Disclosure as RACDisclosure,
  type DisclosureProps as RACDisclosureProps,
  DisclosurePanel as RACDisclosurePanel,
  type DisclosurePanelProps as RACDisclosurePanelProps
} from 'react-aria-components';
import { cx } from 'cva';
import styles from './index.module.css';

/** Edge the drawer anchors to; selects the collapse axis. `top`/`bottom` collapse
 * vertically (height), `left`/`right` collapse horizontally (width). Does not flip
 * in RTL — the side is decided by document/flex order. */
export type InlineDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface InlineDrawerProps extends Omit<RACDisclosureProps, 'className' | 'children'> {
  /** Edge the drawer anchors to; selects the collapse axis. @default 'top' */
  placement?: InlineDrawerPlacement;

  /** Size along the collapse axis when collapsed. Accepts CSS values (e.g. a number of px, or `min-content`). */
  minSize?: number | string;

  /** Size along the collapse axis when expanded. Accepts CSS values (e.g. a number of px, or `max-content`). */
  maxSize?: number | string;

  /** Animate expand/collapse. @default true */
  animate?: boolean;

  /** Additional CSS class for the disclosure root. */
  className?: string;

  /** Content to render inside the drawer. */
  children?: ReactNode;
}

/**
 * An in-flow collapsible built on RAC `Disclosure`. Compose a trigger and content
 * inside it:
 *
 * - Accordion (content hides on collapse): a `Button slot="trigger"` + `InlineDrawerPanel`.
 * - Sidebar rail (content stays visible, width toggles): controlled `isExpanded` +
 *   a toggle + always-visible children (no `InlineDrawerPanel`).
 *
 * @param props - {@link InlineDrawerProps}
 */
export const InlineDrawer = forwardRef<HTMLDivElement, InlineDrawerProps>(function InlineDrawer(props, ref) {
  const { placement = 'top', minSize, maxSize, animate, style: styleProps, className, children, ...rest } = props;

  const style = {
    ...(minSize !== undefined && { '--_min-size': toSize(minSize) }),
    ...(maxSize !== undefined && { '--_max-size': toSize(maxSize) }),
    ...styleProps
  } as CSSProperties;

  return (
    <RACDisclosure
      ref={ref}
      {...rest}
      className={cx(styles.inlineDrawer, className)}
      style={style}
      data-placement={placement}
      data-animate={animate === false ? 'false' : undefined}
    >
      {children}
    </RACDisclosure>
  );
});

export interface InlineDrawerPanelProps extends RACDisclosurePanelProps {}

/**
 * Collapsible content panel for the accordion pattern — a thin wrapper over RAC
 * `DisclosurePanel`. Content is hidden (and `hidden="until-found"`) when collapsed.
 *
 * @param props - {@link InlineDrawerPanelProps}
 */
export const InlineDrawerPanel = function InlineDrawerPanel(props: InlineDrawerPanelProps) {
  const { className, ...rest } = props;
  return <RACDisclosurePanel {...rest} className={cx(styles.panel, className)} />;
};

/** Convert a number or string to a CSS size value. */
function toSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}
