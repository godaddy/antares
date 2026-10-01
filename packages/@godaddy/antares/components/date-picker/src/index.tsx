import { type ReactNode, type Ref, useContext, useMemo, useRef } from 'react';
import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import { mergeProps } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import {
  DEFAULT_SLOT,
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  type DatePickerRenderProps as RACDatePickerRenderProps,
  DatePickerStateContext,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  type DateRangePickerRenderProps as RACDateRangePickerRenderProps,
  DateRangePickerStateContext,
  PopoverContext,
  OverlayTriggerStateContext,
  Provider as RACProvider,
  composeRenderProps,
  useLocale,
  useSlottedContext
} from 'react-aria-components';
import { ButtonContext, type ButtonProps } from '#components/button';
import {
  Calendar,
  type CalendarProps,
  RangeCalendar,
  type RangeCalendarProps,
  ScrollCalendar,
  ScrollRangeCalendar
} from '#components/calendar';
import { Drawer, type DrawerProps } from '#components/drawer';
import { useOverlayContainer } from '#components/_internal/use-overlay-container';
import { Icon } from '#components/icon';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Popover, type PopoverProps } from '#components/popover';
import { SizeProvider, sizeScaleClassName, useDeclaredSize, type ScaleSize } from '#components/size-provider';
import { Content, GroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import fieldStyles from '../../_internal/field-styles/index.module.css';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const DEFAULT_DATE_PLACEHOLDER = 'Select a date';
const DEFAULT_RANGE_PLACEHOLDER = 'Select dates';
const SCALE_GAP = 'var(--_size-gap)';

interface PickerBodyProps {
  /** Whether the field is disabled. */
  isDisabled?: boolean;

  /** The picker's own formatted value, shown in a trigger left empty. */
  value: ReactNode;

  children: ReactNode;
}

/**
 * Styles the parts a picker owns, fills its trigger face, and anchors the overlay to that trigger.
 * It runs inside the picker root, which publishes its trigger props unslotted, so that one value
 * stands in for the trigger and for a plain `Button`.
 *
 * React Aria anchors a picker's overlay to its `Group`, which a composed interior need not have, so
 * this anchors it to the trigger instead - the same element React Aria's own Select anchors to.
 */
function PickerBody({ isDisabled, value, children }: PickerBodyProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const label = useSlottedContext(LabelContext) ?? {};
  const group = useSlottedContext(GroupContext) ?? {};
  const popover = useContext(PopoverContext) ?? {};
  const triggerProps = (useContext(ButtonContext) ?? {}) as ButtonProps;
  const control: ButtonProps = { variant: 'control', isDisabled, className: fieldStyles.control };

  // `mergeProps` merges refs, so React Aria keeps whatever ref it may publish for the trigger.
  const trigger: ButtonProps & { ref?: Ref<HTMLButtonElement> } = {
    variant: 'trigger',
    className: fieldStyles.trigger,
    ref: triggerRef
  };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],

        // The box group owns the chrome, so it carries the disabled state instead of each child dimming itself.
        [GroupContext, { ...group, isDisabled, className: composeClassName(group.className, fieldStyles.group) }],
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: triggerProps,
              control,
              trigger: mergeProps(triggerProps, trigger, {
                children: (
                  <>
                    <Icon icon="calendar" />
                    {value}
                  </>
                )
              })
            }
          }
        ],
        [PopoverContext, { ...popover, triggerRef }]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/** Locale-aware formatter for the trigger label. */
function useTriggerFormatter(formatOptions: Intl.DateTimeFormatOptions) {
  const { locale } = useLocale();

  return useMemo(
    function getFormatter() {
      return new DateFormatter(locale, formatOptions);
    },
    [locale, formatOptions]
  );
}

/** Configuration shared by both picker roots. */
interface PickerValueOwnProps {
  /** Intl.DateTimeFormat options for the trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Placeholder shown until a value is selected. */
  placeholder?: string;
}

export interface DatePickerProps
  extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>,
    Omit<FlexOwnProps, 'as' | 'className'>,
    PickerValueOwnProps {
  /** Size of the field, every part it owns, and its calendar. Follows the size scope when omitted. */
  size?: ScaleSize;

  /** Placeholder when no date is selected. @default 'Select a date' */
  placeholder?: string;

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDatePickerRenderProps) => ReactNode);
}

/**
 * Date-only picker (`CalendarDate`). Compose `Label`, a `Button slot="trigger"`,
 * `DatePickerCalendar`, description, and `FieldError`. An empty trigger picks up a calendar icon
 * and the formatted value from the field.
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <Label>Event date</Label>
 *   <Button slot="trigger" />
 *   <DatePickerCalendar />
 * </DatePicker>
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const { children, size, formatOptions, placeholder, gap = SCALE_GAP, className, isDisabled, ...racProps } = props;
  const scale = useDeclaredSize(size);
  const value = <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />;

  return (
    <SizeProvider size={size}>
      <Flex
        direction="column"
        gap={gap}
        {...racProps}
        isDisabled={isDisabled}
        as={RACDatePicker as typeof RACDatePicker<CalendarDate>}
        data-interior="box"
        className={composeClassName(className, fieldStyles.field, sizeScaleClassName(scale))}
      >
        {composeRenderProps(children, function body(node) {
          return (
            <PickerBody isDisabled={isDisabled} value={value}>
              {node}
            </PickerBody>
          );
        })}
      </Flex>
    </SizeProvider>
  );
}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'size'>,
    Omit<FlexOwnProps, 'as' | 'className'>,
    PickerValueOwnProps {
  /** Size of the field, every part it owns, and its calendar. Follows the size scope when omitted. */
  size?: ScaleSize;

  /** Placeholder when no range is selected. @default 'Select dates' */
  placeholder?: string;

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDateRangePickerRenderProps) => ReactNode);
}

/**
 * Date-only range picker (`CalendarDate`). Compose `Label`, a `Button slot="trigger"`,
 * `DateRangePickerCalendar`, description, and `FieldError`.
 *
 * @example
 * ```tsx
 * <DateRangePicker>
 *   <Label>Trip dates</Label>
 *   <Button slot="trigger" />
 *   <DateRangePickerCalendar />
 * </DateRangePicker>
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const { children, size, formatOptions, placeholder, gap = SCALE_GAP, className, isDisabled, ...racProps } = props;
  const scale = useDeclaredSize(size);
  const value = <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />;

  return (
    <SizeProvider size={size}>
      <Flex
        direction="column"
        gap={gap}
        {...racProps}
        isDisabled={isDisabled}
        as={RACDateRangePicker as typeof RACDateRangePicker<CalendarDate>}
        data-interior="box"
        className={composeClassName(className, fieldStyles.field, sizeScaleClassName(scale))}
      >
        {composeRenderProps(children, function body(node) {
          return (
            <PickerBody isDisabled={isDisabled} value={value}>
              {node}
            </PickerBody>
          );
        })}
      </Flex>
    </SizeProvider>
  );
}

interface PickerOverlayOptions {
  /** Props for the popover layer that positions the calendar. */
  popoverProps?: Omit<PopoverProps, 'children'>;

  /** Choose a drawer below 40rem, or always use a popover. @default 'responsive' */
  overlay?: 'responsive' | 'popover';

  /** Presentation props for the mobile drawer. Open state belongs to the picker. */
  drawerProps?: Omit<DrawerProps, 'children' | 'placement' | 'isOpen' | 'defaultOpen' | 'onOpenChange'>;
}

interface PickerOverlayProps extends PickerOverlayOptions {
  /** Calendar content appropriate for the chosen container. */
  children: (container: 'popover' | 'drawer') => ReactNode;
}

function PickerOverlay({ popoverProps, drawerProps, overlay, children }: PickerOverlayProps) {
  const context = useContext(OverlayTriggerStateContext);
  const local = useOverlayTriggerState(popoverProps ?? {});
  const state =
    popoverProps?.isOpen !== undefined || popoverProps?.defaultOpen !== undefined || !context ? local : context;
  const container = useOverlayContainer({ isOpen: state.isOpen, overlay });

  if (container === 'drawer') {
    return (
      <Drawer
        placement="bottom"
        minSize={drawerProps?.maxSize ?? '85dvh'}
        maxSize="85dvh"
        isDismissable
        {...drawerProps}
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
      >
        <Content style={{ overflow: 'hidden' }}>{children(container)}</Content>
      </Drawer>
    );
  }

  return (
    <Popover hideArrow {...popoverProps} isOpen={state.isOpen} onOpenChange={state.setOpen}>
      <Content>{children(container)}</Content>
    </Popover>
  );
}

export interface DatePickerCalendarProps extends CalendarProps, PickerOverlayOptions {
  /** Months per page. Defaults to one in a popover and three in a drawer. */
  pageCount?: number;
}

/** The responsive calendar overlay opened by a DatePicker. */
export function DatePickerCalendar({ popoverProps, drawerProps, overlay, ...props }: DatePickerCalendarProps) {
  return (
    <PickerOverlay popoverProps={popoverProps} drawerProps={drawerProps} overlay={overlay}>
      {function calendar(container) {
        return container === 'drawer' ? <ScrollCalendar {...props} /> : <Calendar {...props} />;
      }}
    </PickerOverlay>
  );
}

export interface DateRangePickerCalendarProps extends RangeCalendarProps, PickerOverlayOptions {
  /** Months per page. Defaults to two in a popover and three in a drawer. */
  pageCount?: number;

  /** Pending range behavior on background press or blur. Defaults to reset in a drawer and select in a popover. */
  commitBehavior?: RangeCalendarProps['commitBehavior'];
}

/** The responsive calendar overlay opened by a DateRangePicker. */
export function DateRangePickerCalendar({
  popoverProps,
  drawerProps,
  overlay,
  ...props
}: DateRangePickerCalendarProps) {
  return (
    <PickerOverlay popoverProps={popoverProps} drawerProps={drawerProps} overlay={overlay}>
      {function calendar(container) {
        return container === 'drawer' ? <ScrollRangeCalendar {...props} /> : <RangeCalendar {...props} />;
      }}
    </PickerOverlay>
  );
}

export interface DatePickerValueProps extends PickerValueOwnProps {
  /** Placeholder when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/** Formatted date label, or the placeholder. */
export function DatePickerValue(props: DatePickerValueProps) {
  const { formatOptions = DEFAULT_FORMAT, placeholder = DEFAULT_DATE_PLACEHOLDER } = props;
  const state = useContext(DatePickerStateContext);
  const formatter = useTriggerFormatter(formatOptions);
  const value = state?.value;

  if (!value) {
    return <span className={styles.placeholder}>{placeholder}</span>;
  }

  return <span>{formatter.format(value.toDate(getLocalTimeZone()))}</span>;
}

export interface DateRangePickerValueProps extends PickerValueOwnProps {
  /** Placeholder when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/** Formatted `start - end` label, or the placeholder. */
export function DateRangePickerValue(props: DateRangePickerValueProps) {
  const { formatOptions = DEFAULT_FORMAT, placeholder = DEFAULT_RANGE_PLACEHOLDER } = props;
  const state = useContext(DateRangePickerStateContext);
  const formatter = useTriggerFormatter(formatOptions);
  const value = state?.value;

  if (!value?.start || !value?.end) {
    return <span className={styles.placeholder}>{placeholder}</span>;
  }

  const formattedStart = formatter.format(value.start.toDate(getLocalTimeZone()));
  const formattedEnd = formatter.format(value.end.toDate(getLocalTimeZone()));

  return (
    <span>
      {formattedStart} - {formattedEnd}
    </span>
  );
}
