import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { cx } from 'cva';
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButton as RACToggleButton,
  type ToggleButtonProps as RACToggleButtonProps,
  SelectionIndicator as RACSelectionIndicator,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
  type Key as RACKey,
  useLocale
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Tooltip, TooltipTrigger } from '#components/tooltip';
import { useHorizontalScroll } from './use-horizontal-scroll.ts';
import styles from './index.module.css';

interface SegmentedControllerContextValue {
  collapseInactive: boolean;
  selectedValue: string | undefined;
}

const SegmentedControllerContext = createContext<SegmentedControllerContextValue>({
  collapseInactive: false,
  selectedValue: undefined
});

export interface SegmentedControllerItemProps extends Omit<RACToggleButtonProps, 'id'>, Omit<FlexOwnProps, 'as'> {
  /** The value of the segment. */
  value: string;

  /**
   * Optional leading icon. Required when the parent `SegmentedController` has
   * `collapseInactive` set; without it, the segment cannot collapse and the label stays visible.
   */
  icon?: ReactNode;

  /** Additional class names applied to the item element. */
  className?: string;

  /**
   * The segment's label (or arbitrary content when `icon` is not provided).
   * In `collapseInactive` mode this also drives the tooltip text shown on hover/focus.
   */
  children?: ReactNode;
}

/**
 * An individual segment within a SegmentedController.
 *
 * @param props - The properties {@link SegmentedControllerItemProps} passed to the component.
 */
export function SegmentedControllerItem(props: SegmentedControllerItemProps) {
  const { className, children, value, icon, ...rest } = props;
  const { collapseInactive, selectedValue } = useContext(SegmentedControllerContext);

  const isSelected = selectedValue === value;
  const canCollapse = collapseInactive && icon !== undefined;
  const showLabel = !canCollapse || isSelected;
  const tooltipDisabled = !canCollapse || isSelected;

  if (process.env.NODE_ENV !== 'production' && collapseInactive && icon === undefined) {
    // Surface the misuse loudly in dev — render path falls back to showing the label.
    console.warn(
      `[Antares] SegmentedControllerItem (value="${value}") requires an "icon" prop when the parent ` +
        'SegmentedController has "collapseInactive" set. The label will remain visible for this item.'
    );
  }

  const handleFocus = useCallback(
    function handleFocus(e: Parameters<NonNullable<RACToggleButtonProps['onFocus']>>[0]) {
      e.target.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
      rest.onFocus?.(e);
    },
    [rest.onFocus]
  );

  // When the label is collapsed via CSS (width: 0; opacity: 0), some browsers
  // may stop announcing its text. Provide a stable accessible name via aria-label
  // when both the children are a plain string and we're in collapse mode.
  const fallbackAriaLabel =
    canCollapse && !rest['aria-label'] && typeof children === 'string' ? children : rest['aria-label'];

  const button = (
    <Flex
      as={RACToggleButton}
      {...rest}
      id={value}
      alignItems="center"
      onFocus={handleFocus}
      aria-label={fallbackAriaLabel}
      className={cx(styles.item, className)}
    >
      <Flex as={RACSelectionIndicator} className={styles.indicator} />
      {icon !== undefined ? (
        <>
          {icon}
          {children !== undefined ? (
            <span className={cx(styles.label, !showLabel && styles.labelHidden)}>{children}</span>
          ) : null}
        </>
      ) : (
        children
      )}
    </Flex>
  );

  if (!canCollapse) return button;

  return (
    <TooltipTrigger isDisabled={tooltipDisabled} delay={150}>
      {button}
      <Tooltip placement="bottom">{children}</Tooltip>
    </TooltipTrigger>
  );
}

export interface SegmentedControllerProps
  extends Omit<RACToggleButtonGroupProps, 'onSelectionChange'>,
    Omit<FlexOwnProps, 'as'> {
  /** The size of the segmented controller. */
  size?: 'sm' | 'md' | 'lg';

  /** Additional class names applied to the root element. */
  className?: string;

  /** The initial selected value. (uncontrolled) */
  defaultValue?: string;

  /** The selected value. (controlled) */
  value?: string;

  /** Handler that is called when the selection changes. */
  onSelectionChange?: (value: string) => void;

  /** Whether the segmented controller is disabled. */
  isDisabled?: boolean;

  /**
   * When true, only the currently-selected segment shows its label; other segments
   * collapse to their icon and surface their label via tooltip on hover/focus.
   * Each `SegmentedControllerItem` must supply an `icon` prop. The container also
   * reserves a `min-width` sized to the worst-case label state so its outer
   * footprint stays stable as selection changes; buttons center inside the reserved
   * width. @default false
   */
  collapseInactive?: boolean;

  /** The segmented controller items. */
  children?: ReactNode;
}

/**
 * A segmented controller lets users switch between 2+ related views or categories
 * within the same context. Single-selection only.
 *
 * @param props - The properties {@link SegmentedControllerProps} passed to the component.
 */
export function SegmentedController(props: SegmentedControllerProps) {
  const {
    size = 'md',
    className,
    children,
    defaultValue,
    value,
    onSelectionChange,
    isDisabled,
    collapseInactive = false,
    ...rest
  } = props;
  const { direction } = useLocale();
  const { containerRef, scrollButtonsRef, hasOverflow, canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useHorizontalScroll({ isRTL: direction === 'rtl' });

  const [internalSelected, setInternalSelected] = useState<string | undefined>(value ?? defaultValue);
  const selectedValue = value ?? internalSelected;

  const handleSelectionChange = useCallback(
    function handleSelectionChange(values: Set<RACKey>) {
      const selected = String(Array.from(values).at(0));
      setInternalSelected(selected);
      onSelectionChange?.(selected);
    },
    [onSelectionChange]
  );

  // For min-width reservation: extract the per-item info we need to render the hidden mirror.
  const measureItems = useMemo(
    function extractItems() {
      if (!collapseInactive) return null;
      const out: { value: string; icon: ReactNode; label: ReactNode }[] = [];
      React.Children.toArray(children).forEach(function visit(child) {
        if (!React.isValidElement(child) || child.type !== SegmentedControllerItem) return;
        const p = child.props as SegmentedControllerItemProps;
        if (p.icon === undefined) return; // skip items the warning already flagged
        out.push({ value: p.value, icon: p.icon, label: p.children });
      });
      return out;
    },
    [children, collapseInactive]
  );

  const mirrorRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<number | null>(null);

  useEffect(
    function measureFixedWidth() {
      if (!measureItems || !mirrorRef.current || !containerRef.current) {
        setMinWidth(null);
        return;
      }

      const visible = containerRef.current;
      const mirror = mirrorRef.current;

      function compute() {
        let sumCollapsed = 0;
        let maxDelta = 0;
        for (const item of measureItems!) {
          const sel = (state: 'expanded' | 'collapsed') =>
            mirror.querySelector<HTMLElement>(`[data-measure="${state}"][data-value="${CSS.escape(item.value)}"]`);
          const eW = sel('expanded')?.getBoundingClientRect().width ?? 0;
          const cW = sel('collapsed')?.getBoundingClientRect().width ?? 0;
          sumCollapsed += cW;
          const delta = eW - cW;
          if (delta > maxDelta) maxDelta = delta;
        }

        const cs = getComputedStyle(visible);
        const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0;
        const padInline =
          (parseFloat(cs.paddingInlineStart || cs.paddingLeft || '0') || 0) +
          (parseFloat(cs.paddingInlineEnd || cs.paddingRight || '0') || 0);
        const n = measureItems!.length;
        setMinWidth(sumCollapsed + maxDelta + Math.max(0, n - 1) * gap + padInline);
      }

      compute();
      const ro = new ResizeObserver(compute);
      ro.observe(mirror);
      return function cleanup() {
        ro.disconnect();
      };
    },
    [measureItems, containerRef]
  );

  const ctx = useMemo(
    function buildCtx() {
      return { collapseInactive, selectedValue };
    },
    [collapseInactive, selectedValue]
  );

  return (
    <SegmentedControllerContext.Provider value={ctx}>
      <Flex
        {...rest}
        display="inline-flex"
        as={RACToggleButtonGroup}
        defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
        onSelectionChange={handleSelectionChange}
        disallowEmptySelection
        selectionMode="single"
        isDisabled={isDisabled}
        selectedKeys={value ? [value] : undefined}
        data-size={size}
        data-collapse-inactive={collapseInactive || undefined}
        dir={direction}
        className={cx(styles.container, className)}
      >
        <Flex
          ref={containerRef}
          gap="xs"
          padding="xs"
          className={styles.content}
          style={minWidth != null ? { minWidth: `${minWidth}px` } : undefined}
        >
          {children}
        </Flex>

        {hasOverflow ? (
          <Flex className={styles.scrollButtons} ref={scrollButtonsRef}>
            <Button
              size="md"
              aria-label="Scroll previous"
              onPress={scrollPrev}
              className={styles.scrollBtn}
              isDisabled={!canScrollPrev}
            >
              <Icon icon="chevron-left" />
            </Button>
            <Button
              size="md"
              aria-label="Scroll next"
              onPress={scrollNext}
              className={styles.scrollBtn}
              isDisabled={!canScrollNext}
            >
              <Icon icon="chevron-right" />
            </Button>
          </Flex>
        ) : null}

        {measureItems ? (
          <div ref={mirrorRef} aria-hidden="true" className={styles.mirror}>
            {measureItems.map(function expanded(item) {
              return (
                <Flex
                  as="span"
                  key={`e-${item.value}`}
                  alignItems="center"
                  gap="xs"
                  className={styles.item}
                  data-measure="expanded"
                  data-value={item.value}
                >
                  {item.icon}
                  <span className={styles.label}>{item.label}</span>
                </Flex>
              );
            })}
            {measureItems.map(function collapsed(item) {
              return (
                <Flex
                  as="span"
                  key={`c-${item.value}`}
                  alignItems="center"
                  gap="xs"
                  className={styles.item}
                  data-measure="collapsed"
                  data-value={item.value}
                >
                  {item.icon}
                </Flex>
              );
            })}
          </div>
        ) : null}
      </Flex>
    </SegmentedControllerContext.Provider>
  );
}
