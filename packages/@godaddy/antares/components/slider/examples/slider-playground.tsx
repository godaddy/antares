import { Slider, type SliderProps, type SliderRef } from '@godaddy/antares';
import { type ReactNode, type Ref, useEffect, useState } from 'react';

export interface SliderPlaygroundExampleProps {
  label?: string;

  description?: string;

  value?: number;

  defaultValue?: number;

  minValue?: number;

  maxValue?: number;

  step?: number;

  markers?: boolean;

  valueLabel?: SliderProps['valueLabel'];

  minLabel?: ReactNode;

  maxLabel?: ReactNode;

  formatOptions?: Intl.NumberFormatOptions;

  isRequired?: boolean;

  isDisabled?: boolean;

  onChangeEnd?(value: number): void;

  rootRef?: Ref<SliderRef>;
}

export function SliderPlaygroundExample({
  label = 'Volume',
  description,
  value,
  defaultValue = 50,
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
  onChangeEnd,
  rootRef
}: SliderPlaygroundExampleProps) {
  const [currentValue, setCurrentValue] = useState(value ?? defaultValue);
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
    <Slider
      ref={rootRef}
      key={isControlled ? 'controlled' : `uncontrolled-${defaultValue}`}
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
      onChangeEnd={onChangeEnd}
    />
  );
}
