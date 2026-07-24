import { RangeField, type RangeFieldProps, type RangeFieldRef } from '#components/range-field';
import { forwardRef } from 'react';

/** Imperative controls for a {@link Slider}. */
export type SliderRef = RangeFieldRef;

/** Props for configuring a single-value {@link Slider}. */
export interface SliderProps
  extends Omit<
    RangeFieldProps<number>,
    'value' | 'defaultValue' | 'onChange' | 'onChangeEnd' | 'thumbLabels' | 'thumbNames'
  > {
  /** Current value (controlled). */
  value?: number;

  /** Default value for uncontrolled usage. @default 0 */
  defaultValue?: number;

  /** Callback fired when the slider value changes. */
  onChange?(value: number): void;

  /** Callback fired when the user stops dragging. */
  onChangeEnd?(value: number): void;
}

/**
 * Single-value slider for choosing a number within a bounded scale using pointer, touch, or keyboard input.
 * Use a forwarded {@link SliderRef} to focus the thumb or access the root element.
 *
 * @param props - {@link SliderProps}
 * @returns Slider field with one adjustable thumb.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" defaultValue={50} minValue={0} maxValue={100} valueLabel />
 * ```
 */
export const Slider = forwardRef<SliderRef, SliderProps>(function Slider(
  { value, defaultValue, onChange, onChangeEnd, ...props },
  ref
) {
  return (
    <RangeField<number>
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      {...props}
    />
  );
});
