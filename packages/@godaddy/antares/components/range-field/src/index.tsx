import {
  Slider as RACSlider,
  SliderFill as RACSliderFill,
  SliderOutput as RACSliderOutput,
  type SliderOutputProps as RACSliderOutputProps,
  type SliderProps as RACSliderProps,
  SliderStateContext as RACSliderStateContext,
  SliderThumb as RACSliderThumb,
  SliderTrack as RACSliderTrack
} from 'react-aria-components';
import { Field, FieldDescription, FieldLabel, type FieldOwnProps } from '#components/field';
import { Flex } from '#components/layout/flex';
import { cx } from 'cva';
import {
  createRef,
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  type RefObject,
  useContext,
  useImperativeHandle,
  useId,
  useMemo,
  useRef
} from 'react';
import styles from './index.module.css';

const MAX_MARKER_COUNT = 1000;

interface RangeFieldSharedProps<T extends number | number[]>
  extends Omit<RACSliderProps<T>, 'children' | 'className' | 'orientation' | 'render' | 'style'>,
    Omit<FieldOwnProps, 'errorMessage'> {
  /** Current value or values. Each array entry renders an independently adjustable thumb. */
  value?: T;

  /** Default value(s) for uncontrolled usage. */
  defaultValue?: T;

  /** Callback fired when the value or values change. */
  onChange?(value: T): void;

  /** Callback when user stops dragging. */
  onChangeEnd?(value: T): void;

  /** Minimum value. @default 0 */
  minValue?: number;

  /** Maximum value. @default 100 */
  maxValue?: number;

  /** Snap interval. @default 1 */
  step?: number;

  /** Disables the slider. */
  isDisabled?: boolean;

  /** Intl format options for value display (e.g. { style: 'percent' }). */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Content displayed opposite the input label. Pass `true` to display the formatted value,
   * a React node for static content, or a render function to access the slider state.
   */
  valueLabel?: RACSliderOutputProps['children'];

  /** Content shown below the minimum end of the track. */
  minLabel?: ReactNode;

  /** Content shown below the maximum end of the track. */
  maxLabel?: ReactNode;

  /** Whether to render a marker at each step position. */
  markers?: boolean;

  /** Per-thumb form input names. Length must match value array length. */
  thumbNames?: string[];

  /** Additional CSS class applied to the root element. */
  className?: string;

  /** Marks the slider as required in a form context. */
  isRequired?: boolean;
}

/** Props for configuring a {@link RangeField} and its generated slider controls. */
export type RangeFieldProps<T extends number | number[] = number | number[]> = T extends number[]
  ? RangeFieldSharedProps<T> & {
      /**
       * Accessible label for each thumb. Keep entries aligned with the values array.
       * @example ['Minimum price', 'Maximum price']
       */
      thumbLabels: string[];
    }
  : RangeFieldSharedProps<T> & {
      /** A scalar value is named by the field's visible or ARIA label. */
      thumbLabels?: never;
    };

type RangeFieldImplementationProps<T extends number | number[]> = RangeFieldSharedProps<T> & {
  thumbLabels?: string[];
};

/** Imperative controls for a {@link RangeField}. */
export interface RangeFieldRef {
  /** Root element rendered by the range field. */
  container: HTMLDivElement | null;

  /** Moves focus to the first thumb. */
  focus(): void;
}

/**
 * Numeric slider field for selecting one or more values within a bounded scale. Pass a number for a
 * single thumb or an array to render one independently adjustable thumb per value.
 * Use a forwarded {@link RangeFieldRef} to focus the first thumb or access the root element.
 *
 * @param props - {@link RangeFieldProps}
 * @returns Slider field with optional value output, markers, endpoint labels, description, and error message.
 *
 * @example
 * ```tsx
 * <RangeField<number[]>
 *   label="Target range"
 *   defaultValue={[20, 80]}
 *   thumbLabels={['Minimum target', 'Maximum target']}
 *   markers
 * />
 * ```
 */
export const RangeField = forwardRef(function RangeField<T extends number | number[] = number | number[]>(
  {
    label,
    description,
    className,
    markers = false,
    valueLabel,
    minLabel,
    maxLabel,
    thumbLabels,
    thumbNames,
    value,
    defaultValue,
    minValue = 0,
    maxValue = 100,
    step = 1,
    isRequired,
    formatOptions,
    'aria-describedby': ariaDescribedBy,
    gap = 'sm',
    ...props
  }: RangeFieldImplementationProps<T>,
  ref: ForwardedRef<RangeFieldRef>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbInputRefs = useRef<RefObject<HTMLInputElement | null>[]>([]);
  const descriptionId = useId();
  const describedBy = [ariaDescribedBy, description ? descriptionId : undefined].filter(Boolean).join(' ') || undefined;

  useImperativeHandle(
    ref,
    function createRangeFieldHandle() {
      return {
        container: containerRef.current,

        focus() {
          thumbInputRefs.current[0]?.current?.focus();
        }
      };
    },
    []
  );

  return (
    <Field
      as={RACSlider<T>}
      ref={containerRef}
      value={value}
      defaultValue={defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      isRequired={isRequired}
      formatOptions={formatOptions}
      aria-describedby={describedBy}
      gap={gap}
      {...props}
      className={cx(styles.slider, className)}
    >
      <RangeFieldHeader label={label} isRequired={isRequired} valueLabel={valueLabel} />
      <RangeFieldControl
        markers={markers}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        thumbLabels={thumbLabels}
        thumbNames={thumbNames}
        thumbInputRefs={thumbInputRefs}
        isRequired={isRequired}
      />
      <RangeFieldLabels minLabel={minLabel} maxLabel={maxLabel} />
      <FieldDescription id={descriptionId}>{description}</FieldDescription>
    </Field>
  );
}) as <T extends number | number[] = number | number[]>(
  props: RangeFieldProps<T> & RefAttributes<RangeFieldRef>
) => ReactElement;

/**
 * Renders the field label and optional current-value output.
 *
 * @param props - Label, required state, and value-label configuration from {@link RangeFieldProps}.
 * @returns Header content, or `null` when neither label is present.
 */
function RangeFieldHeader({
  label,
  isRequired,
  valueLabel
}: Pick<RangeFieldSharedProps<number | number[]>, 'label' | 'isRequired' | 'valueLabel'>) {
  const valueLabelVisible = valueLabel != null && valueLabel !== false;

  if (!label && !valueLabelVisible) {
    return null;
  }

  return (
    <Flex direction="row" wrap="wrap" gap="sm" alignItems="center" className={styles.header}>
      <FieldLabel isRequired={isRequired} className={styles.label}>
        {label}
      </FieldLabel>
      {valueLabelVisible && (
        <RACSliderOutput className={styles.valueLabel}>{valueLabel === true ? undefined : valueLabel}</RACSliderOutput>
      )}
    </Flex>
  );
}

/**
 * Renders the interactive track, markers, fill, and thumbs using the nearest React Aria slider state.
 *
 * @param props - Scale, marker, accessible thumb label, and form name configuration.
 * @returns Interactive slider track.
 */
function RangeFieldControl({
  markers,
  minValue,
  maxValue,
  step,
  thumbLabels,
  thumbNames,
  thumbInputRefs,
  isRequired
}: Required<Pick<RangeFieldSharedProps<number | number[]>, 'markers' | 'minValue' | 'maxValue' | 'step'>> &
  Pick<RangeFieldImplementationProps<number | number[]>, 'isRequired' | 'thumbLabels' | 'thumbNames'> & {
    thumbInputRefs: RefObject<RefObject<HTMLInputElement | null>[]>;
  }) {
  const state = useContext(RACSliderStateContext);
  const markerPositions = useMemo(
    function calculateMarkerPositions() {
      const range = maxValue - minValue;

      if (!markers || !Number.isFinite(range) || range <= 0 || !Number.isFinite(step) || step <= 0) {
        return [];
      }

      const intervalCount = range / step;
      const roundedIntervalCount = Math.round(intervalCount);
      const roundingTolerance = Number.EPSILON * Math.max(1, Math.abs(intervalCount)) * 8;
      const resolvedIntervalCount =
        Math.abs(intervalCount - roundedIntervalCount) <= roundingTolerance
          ? roundedIntervalCount
          : Math.floor(intervalCount);
      const count = resolvedIntervalCount + 1;

      if (!Number.isSafeInteger(count) || count > MAX_MARKER_COUNT) {
        return [];
      }

      return Array.from({ length: count }, function getMarkerPosition(_, index) {
        return Math.min((index * step * 100) / range, 100);
      });
    },
    [markers, minValue, maxValue, step]
  );

  if (!state) {
    throw new Error('RangeFieldControl must be rendered within a React Aria Slider.');
  }

  const markersVisible = markerPositions.length > 0;
  const isRange = state.values.length > 1;

  function getThumbInputRef(index: number) {
    const existingRef = thumbInputRefs.current[index];

    if (existingRef) {
      return existingRef;
    }

    const inputRef = createRef<HTMLInputElement>();
    thumbInputRefs.current[index] = inputRef;

    return inputRef;
  }

  return (
    <RACSliderTrack
      className={styles.track}
      data-markers={markersVisible || undefined}
      data-range={isRange || undefined}
    >
      {markerPositions.map(function renderMarker(percent) {
        return (
          <span
            key={percent}
            aria-hidden="true"
            className={styles.marker}
            style={{ insetInlineStart: `${percent}%` }}
          />
        );
      })}
      <RACSliderFill
        className={styles.fill}
        style={{ height: 'var(--_slider-fill-height)' }}
        data-markers={markersVisible || undefined}
        data-range={isRange || undefined}
      />
      {state.values.map(function renderThumb(_, index) {
        return (
          <RACSliderThumb
            key={index}
            index={index}
            aria-label={thumbLabels?.[index]}
            isRequired={isRequired}
            name={thumbNames?.[index]}
            inputRef={getThumbInputRef(index)}
            className={styles.thumb}
          />
        );
      })}
    </RACSliderTrack>
  );
}

/**
 * Renders independently supplied labels at the minimum and maximum ends of the scale.
 *
 * @param props - Endpoint label content from {@link RangeFieldProps}.
 * @returns Endpoint label row, or `null` when neither label is provided.
 */
function RangeFieldLabels({
  minLabel,
  maxLabel
}: Pick<RangeFieldSharedProps<number | number[]>, 'minLabel' | 'maxLabel'>) {
  if (minLabel == null && maxLabel == null) {
    return null;
  }

  return (
    <Flex direction="row" justifyContent="space-between" className={styles.rangeLabels}>
      <div className={styles.minLabel}>{minLabel}</div>
      <div className={styles.maxLabel}>{maxLabel}</div>
    </Flex>
  );
}
