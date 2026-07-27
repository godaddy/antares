import { RangeField, type RangeFieldProps, type RangeFieldRef } from '#components/range-field';
import { forwardRef } from 'react';

/** Imperative controls for a {@link RangeSlider}. */
export type RangeSliderRef = RangeFieldRef;

/** Props for configuring a two-value {@link RangeSlider}. */
export interface RangeSliderProps
  extends Omit<
    RangeFieldProps<[number, number]>,
    'value' | 'defaultValue' | 'onChange' | 'onChangeEnd' | 'thumbLabels' | 'thumbNames'
  > {
  /** Current range value [start, end] (controlled). */
  value?: [number, number];

  /** Default range value [start, end] for uncontrolled usage. Defaults to [minValue, maxValue]. */
  defaultValue?: [number, number];

  /** Callback fired when the range value changes. */
  onChange?(value: [number, number]): void;

  /** Callback fired when the user stops dragging. */
  onChangeEnd?(value: [number, number]): void;

  /**
   * Accessible labels for each thumb. First element labels the start thumb,
   * second labels the end thumb. Required for accessibility.
   * @example ['Minimum price', 'Maximum price']
   */
  thumbLabels: [string, string];

  /**
   * HTML input names for the start and end thumbs. Used for form submission.
   * @example ['priceMin', 'priceMax']
   */
  thumbNames?: [string, string];
}

/**
 * Two-value slider for selecting the start and end of a bounded numeric range.
 * Use a forwarded {@link RangeSliderRef} to focus the first thumb or access the root element.
 *
 * @param props - {@link RangeSliderProps}
 * @returns Slider field with independently accessible start and end thumbs.
 *
 * @example
 * ```tsx
 * <RangeSlider
 *   label="Price range"
 *   defaultValue={[25, 75]}
 *   thumbLabels={['Minimum price', 'Maximum price']}
 * />
 * ```
 */
export const RangeSlider = forwardRef<RangeSliderRef, RangeSliderProps>(function RangeSlider(rangeSliderProps, ref) {
  const {
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    thumbLabels,
    thumbNames,
    minValue = 0,
    maxValue = 100,
    ...props
  } = rangeSliderProps;
  const resolvedDefaultValue = value === undefined ? (defaultValue ?? [minValue, maxValue]) : defaultValue;

  return (
    <RangeField<[number, number]>
      ref={ref}
      value={value}
      defaultValue={resolvedDefaultValue}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      thumbLabels={thumbLabels}
      thumbNames={thumbNames}
      minValue={minValue}
      maxValue={maxValue}
      {...props}
    />
  );
});
