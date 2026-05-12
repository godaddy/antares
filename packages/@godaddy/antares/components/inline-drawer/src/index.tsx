import { createContext, forwardRef, useContext, useEffect, useRef, type ReactNode } from 'react';
import {
  Disclosure as RACDisclosure,
  type DisclosureProps as RACDisclosureProps,
  DisclosurePanel as RACDisclosurePanel,
  type DisclosurePanelProps as RACDisclosurePanelProps,
  DisclosureStateContext as RACDisclosureStateContext,
  Heading as RACHeading,
  Button as RACButton
} from 'react-aria-components';
import { cx } from 'cva';
import { useObjectRef } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import styles from './index.module.css';

const HasMinSizeContext = createContext<boolean>(false);

export type InlineDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/** Props for the {@link InlineDrawer} component. */
export interface InlineDrawerProps extends Omit<RACDisclosureProps, 'className' | 'children' | 'style'> {
  /** Edge the drawer anchors to. Determines constrained axis.
   * Unlike Drawer, InlineDrawer does not flip in RTL because CSS inline-size/block-size
   * are already logical-direction-aware. The value is physical.
   * @default 'left' */
  placement?: InlineDrawerPlacement;
  /** Size when collapsed. Panel stays visible at this size instead of hiding. */
  minSize?: number | string;
  /** Size when expanded. */
  maxSize?: number | string;
  /** CSS transition for expand/collapse. false disables animation. @default true */
  animate?: boolean;
  /** Collapse when focus leaves the drawer. Does not collapse when focus moves to browser chrome. */
  shouldDismissOnBlur?: boolean;
  /** Additional CSS class. */
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

function toSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

// Heuristic: checks if focus moved to a portal controlled by an element inside the drawer.
// Limitations:
// - Relies on aria-controls + aria-expanded="true" being set synchronously before focusout fires.
// - Only detects portals linked via aria-controls or RAC's data-react-aria-top-layer attribute.
// - Non-RAC portals or custom overlays will not be detected and will trigger collapse.
function isInsideControlledPortal(drawer: Element, target: Element): boolean {
  const triggers = drawer.querySelectorAll('[aria-controls][aria-expanded="true"]');
  for (const trigger of Array.from(triggers)) {
    const ids = trigger.getAttribute('aria-controls')?.split(' ') ?? [];
    for (const id of ids) {
      if (document.getElementById(id)?.contains(target)) return true;
    }
  }
  return !!target.closest('[data-react-aria-top-layer]');
}

/**
 * An inline collapsible panel that stays in document flow.
 *
 * @param props - {@link InlineDrawerProps}
 */
export const InlineDrawer = forwardRef<HTMLDivElement, InlineDrawerProps>(function InlineDrawer(
  props: Record<string, any>,
  ref
) {
  const {
    placement = 'left',
    minSize,
    maxSize,
    animate,
    shouldDismissOnBlur,
    isExpanded: controlledExpanded,
    defaultExpanded,
    onExpandedChange,
    isDisabled,
    className,
    children,
    ...rest
  } = props;

  const [expanded, setExpanded] = useControlledState(controlledExpanded, defaultExpanded ?? false, onExpandedChange);
  const hasMinSize = minSize !== undefined && (typeof minSize === 'number' ? minSize > 0 : parseFloat(minSize) > 0);
  const drawerRef = useObjectRef(ref);

  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;
  const isDisabledRef = useRef(isDisabled);
  isDisabledRef.current = isDisabled;

  useEffect(
    function setupDismissOnBlur() {
      if (!shouldDismissOnBlur) return;
      const el = drawerRef.current;
      if (!el) return;
      const drawer = el;
      function onFocusOut(e: FocusEvent) {
        if (!expandedRef.current || isDisabledRef.current) return;
        const related = e.relatedTarget as Element | null;
        if (related == null) return;
        if (drawer.contains(related)) return;
        if (isInsideControlledPortal(drawer, related)) return;
        setExpanded(false);
      }
      drawer.addEventListener('focusout', onFocusOut);
      return function cleanup() {
        drawer.removeEventListener('focusout', onFocusOut);
      };
    },
    [shouldDismissOnBlur, setExpanded]
  );

  let sizeVar: string | undefined;
  if (hasMinSize) {
    sizeVar = expanded ? (toSize(maxSize) ?? 'auto') : toSize(minSize);
  } else if (maxSize !== undefined && expanded) {
    sizeVar = toSize(maxSize);
  }

  const animateStyle = animate === false ? { transition: 'none' } : undefined;

  const style = {
    ...(sizeVar !== undefined && { '--_size': sizeVar }),
    ...animateStyle
  } as React.CSSProperties;

  return (
    <RACDisclosure
      ref={drawerRef}
      {...rest}
      isExpanded={expanded}
      onExpandedChange={setExpanded}
      isDisabled={isDisabled}
      className={cx(styles.inlineDrawer, className)}
      style={style}
      data-placement={placement}
      data-persist-content={hasMinSize ? '' : undefined}
    >
      <HasMinSizeContext.Provider value={hasMinSize}>{children}</HasMinSizeContext.Provider>
    </RACDisclosure>
  );
});

/**
 * Trigger button for an InlineDrawer. Renders a heading with trigger button.
 *
 * @param props - {@link InlineDrawerTriggerProps}
 */
export const InlineDrawerTrigger = function InlineDrawerTrigger(props: InlineDrawerTriggerProps) {
  const { children, className } = props;
  return (
    <RACHeading className={cx(styles.trigger, className)}>
      <RACButton slot="trigger" className={styles.triggerButton}>
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
export const InlineDrawerPanel = forwardRef<HTMLDivElement, InlineDrawerPanelProps>(
  function InlineDrawerPanel(props, ref) {
    const { className, children, ...rest } = props;
    const hasMinSize = useContext(HasMinSizeContext);
    const state = useContext(RACDisclosureStateContext);
    const persistVisible = hasMinSize && !state?.isExpanded;
    const internalRef = useObjectRef(ref);

    // TECH DEBT: RAC re-applies aria-hidden on every render when the panel is collapsed.
    // This observer overrides that behavior when minSize keeps content visible.
    // Fragile on RAC upgrades. Remove when RAC supports a forceVisible or similar prop.
    useEffect(
      function overrideAriaHidden() {
        if (!persistVisible) return;
        const el = internalRef.current;
        if (!el) return;
        el.removeAttribute('aria-hidden');
        const observer = new MutationObserver(function onMutation() {
          if (el.hasAttribute('aria-hidden')) el.removeAttribute('aria-hidden');
        });
        observer.observe(el, { attributes: true, attributeFilter: ['aria-hidden'] });
        return function cleanup() {
          observer.disconnect();
        };
      },
      [persistVisible, internalRef]
    );

    return (
      <RACDisclosurePanel ref={internalRef} {...rest} className={cx(styles.panel, className)}>
        {children}
      </RACDisclosurePanel>
    );
  }
);
