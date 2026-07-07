import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from 'react';
import {
  Disclosure as RACDisclosure,
  type DisclosureProps as RACDisclosureProps,
  DisclosurePanel as RACDisclosurePanel,
  type DisclosurePanelProps as RACDisclosurePanelProps,
  Heading as RACHeading,
  Button as RACButton
} from 'react-aria-components';
import { cx } from 'cva';
import styles from './index.module.css';

/** Edge the drawer anchors to; selects the collapse axis. Physical value — the
 * RTL side is decided by document flow, so the component does not flip. */
export type InlineDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

interface InlineDrawerContextValue {
  triggerId: string;
  panelId: string;
  isPeek: boolean;
}

const InlineDrawerContext = createContext<InlineDrawerContextValue>({
  triggerId: '',
  panelId: '',
  isPeek: false
});

/** Props for the {@link InlineDrawer} component. */
export interface InlineDrawerProps extends Omit<RACDisclosureProps, 'className' | 'children' | 'style'> {
  /** Edge the drawer anchors to; selects the collapse axis. `top`/`bottom` collapse
   * vertically (height), `left`/`right` collapse horizontally (width). Does not flip
   * in RTL. @default 'top' */
  placement?: InlineDrawerPlacement;
  /** Collapsed "peek" size. When set, the panel stays visible at this size instead of hiding. Accepts CSS values. */
  minSize?: number | string;
  /** Expanded size. Accepts CSS values. */
  maxSize?: number | string;
  /** Animate expand/collapse. @default true */
  animate?: boolean;
  /** Additional CSS class for the disclosure root. */
  className?: string;
  children?: ReactNode;
}

/** Props for the {@link InlineDrawerTrigger} component. */
export interface InlineDrawerTriggerProps {
  /** Trigger content. */
  children?: ReactNode;
  /** Additional CSS class. */
  className?: string;
}

/** Props for the {@link InlineDrawerPanel} component. */
export interface InlineDrawerPanelProps extends Omit<RACDisclosurePanelProps, 'className' | 'children'> {
  /** Panel content. */
  children?: ReactNode;
  /** Additional CSS class. */
  className?: string;
}

function toSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * An in-flow collapsible panel that expands/collapses along one axis, built on
 * RAC Disclosure. When `minSize` is set, the panel "peeks" — it stays visible at
 * the collapsed size (sidebar-nav pattern) instead of hiding.
 *
 * @param props - {@link InlineDrawerProps}
 */
export const InlineDrawer = forwardRef<HTMLDivElement, InlineDrawerProps>(function InlineDrawer(props, ref) {
  const { placement = 'top', minSize, maxSize, animate, className, children, ...rest } = props;
  const isPeek = minSize !== undefined;
  const triggerId = useId();
  const panelId = useId();

  const style = {
    ...(minSize !== undefined && { '--_min-size': toSize(minSize) }),
    ...(maxSize !== undefined && { '--_max-size': toSize(maxSize) })
  } as CSSProperties;

  return (
    <RACDisclosure
      ref={ref}
      {...rest}
      className={cx(styles.inlineDrawer, className)}
      style={style}
      data-placement={placement}
      data-peek={isPeek || undefined}
      data-animate={animate === false ? 'false' : undefined}
    >
      <InlineDrawerContext.Provider value={{ triggerId, panelId, isPeek }}>{children}</InlineDrawerContext.Provider>
    </RACDisclosure>
  );
});

/**
 * Trigger button for an InlineDrawer. Renders a heading wrapping the toggle button.
 *
 * @param props - {@link InlineDrawerTriggerProps}
 */
export const InlineDrawerTrigger = function InlineDrawerTrigger(props: InlineDrawerTriggerProps) {
  const { children, className } = props;
  const { triggerId, panelId, isPeek } = useContext(InlineDrawerContext);
  // Peek mode renders a plain region (not RAC's DisclosurePanel), so we thread
  // aria-controls -> our region id ourselves. In default mode RAC wires it.
  const peekProps = isPeek ? { id: triggerId, 'aria-controls': panelId } : {};
  return (
    <RACHeading className={cx(styles.trigger, className)}>
      <RACButton slot="trigger" className={styles.triggerButton} {...peekProps}>
        {children}
      </RACButton>
    </RACHeading>
  );
};

/**
 * Collapsible content panel for an InlineDrawer.
 *
 * @param props - {@link InlineDrawerPanelProps}
 */
export const InlineDrawerPanel = forwardRef<HTMLDivElement, InlineDrawerPanelProps>(function InlineDrawerPanel(
  props,
  ref
) {
  const { className, children, ...rest } = props;
  const { triggerId, panelId, isPeek } = useContext(InlineDrawerContext);

  // Peek mode: always-visible region. RAC's DisclosurePanel would set hidden +
  // aria-hidden when collapsed, which is wrong when content stays visible — so we
  // render a plain region and drive its size via CSS ([data-expanded] on the root).
  if (isPeek) {
    return (
      <div
        {...(rest as HTMLAttributes<HTMLDivElement>)}
        ref={ref}
        id={panelId}
        aria-labelledby={triggerId}
        role="group"
        className={cx(styles.panel, className)}
      >
        {children}
      </div>
    );
  }

  // Default mode: pure RAC. Native hide, hidden="until-found", ARIA, and the
  // --disclosure-panel-width/height size animation all come from RAC.
  return (
    <RACDisclosurePanel {...rest} ref={ref} className={cx(styles.panel, className)}>
      {children}
    </RACDisclosurePanel>
  );
});
