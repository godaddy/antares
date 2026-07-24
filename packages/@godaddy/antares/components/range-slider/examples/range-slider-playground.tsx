import { RangeSlider, type RangeSliderProps, type RangeSliderRef } from '@godaddy/antares';
import { type ReactNode, type Ref, useEffect, useState } from 'react';

export interface RangeSliderPlaygroundExampleProps {
  label?: string;

  description?: string;

  value?: [number, number];

  defaultValue?: [number, number];

  minValue?: number;

  maxValue?: number;

  step?: number;

  markers?: boolean;

  valueLabel?: RangeSliderProps['valueLabel'];

  minLabel?: ReactNode;

  maxLabel?: ReactNode;

  formatOptions?: Intl.NumberFormatOptions;

  isRequired?: boolean;

  isDisabled?: boolean;

  thumbLabels: [string, string];

  startName?: string;

  endName?: string;

  onChangeEnd?(value: [number, number]): void;

  rootRef?: Ref<RangeSliderRef>;
}

export function RangeSliderPlaygroundExample({
  label = 'Price range',
  description,
  value,
  defaultValue = [20, 80],
  minValue = 0,
  maxValue = 100,
  step = 10,
  markers = false,
  valueLabel = false,
  minLabel,
  maxLabel,
  formatOptions,
  isRequired,
  isDisabled = false,
  thumbLabels,
  startName,
  endName,
  onChangeEnd,
  rootRef
}: RangeSliderPlaygroundExampleProps) {
  const [currentValue, setCurrentValue] = useState<[number, number]>(value ?? defaultValue);
  const isControlled = value !== undefined;

  useEffect(
    function synchronizeControlledValue() {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    },
    [value]
  );

  return (
    <RangeSlider
      ref={rootRef}
      key={isControlled ? 'controlled' : `uncontrolled-${defaultValue.join('-')}`}
      label={label}
      description={description}
      value={isControlled ? currentValue : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={isControlled ? setCurrentValue : undefined}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      markers={markers}
      valueLabel={valueLabel}
      minLabel={minLabel}
      maxLabel={maxLabel}
      formatOptions={formatOptions}
      isRequired={isRequired}
      isDisabled={isDisabled}
      thumbLabels={thumbLabels}
      startName={startName}
      endName={endName}
      onChangeEnd={onChangeEnd}
    />
  );
}
