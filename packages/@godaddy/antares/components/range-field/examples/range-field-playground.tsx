import { RangeField, type RangeFieldProps, type RangeFieldRef } from '@godaddy/antares';
import { type ReactNode, type Ref, useEffect, useState } from 'react';

export interface RangeFieldPlaygroundExampleProps {
  label?: string;

  description?: string;

  value?: number | number[];

  defaultValue?: number | number[];

  minValue?: number;

  maxValue?: number;

  step?: number;

  markers?: boolean;

  valueLabel?: RangeFieldProps['valueLabel'];

  minLabel?: ReactNode;

  maxLabel?: ReactNode;

  thumbLabels?: string[];

  thumbNames?: string[];

  formatOptions?: Intl.NumberFormatOptions;

  isRequired?: boolean;

  isDisabled?: boolean;

  onChangeEnd?(value: number | number[]): void;

  rootRef?: Ref<RangeFieldRef>;
}

export function RangeFieldPlaygroundExample({
  label = 'Volume',
  description,
  value,
  defaultValue = 50,
  minValue = 0,
  maxValue = 100,
  step = 10,
  markers = true,
  valueLabel = false,
  minLabel,
  maxLabel,
  thumbLabels,
  thumbNames,
  formatOptions,
  isRequired,
  isDisabled = false,
  onChangeEnd,
  rootRef
}: RangeFieldPlaygroundExampleProps) {
  const [currentValue, setCurrentValue] = useState<number | number[]>(value ?? defaultValue);
  const isControlled = value !== undefined;
  const defaultValueKey = Array.isArray(defaultValue) ? defaultValue.join('-') : defaultValue;

  useEffect(
    function synchronizeControlledValue() {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    },
    [value]
  );

  if (Array.isArray(currentValue)) {
    const arrayDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    const accessibleThumbLabels =
      thumbLabels ??
      currentValue.map(function createThumbLabel(_, index) {
        return `Value ${index + 1}`;
      });

    return (
      <RangeField<number[]>
        ref={rootRef}
        key={isControlled ? 'controlled' : `uncontrolled-${defaultValueKey}`}
        label={label}
        description={description}
        value={isControlled ? currentValue : undefined}
        defaultValue={isControlled ? undefined : arrayDefaultValue}
        onChange={isControlled ? setCurrentValue : undefined}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        markers={markers}
        valueLabel={valueLabel}
        minLabel={minLabel}
        maxLabel={maxLabel}
        thumbLabels={accessibleThumbLabels}
        thumbNames={thumbNames}
        formatOptions={formatOptions}
        isRequired={isRequired}
        isDisabled={isDisabled}
        onChangeEnd={onChangeEnd}
      />
    );
  }

  const scalarDefaultValue = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;

  return (
    <RangeField<number>
      ref={rootRef}
      key={isControlled ? 'controlled' : `uncontrolled-${defaultValueKey}`}
      label={label}
      description={description}
      value={isControlled ? currentValue : undefined}
      defaultValue={isControlled ? undefined : scalarDefaultValue}
      onChange={isControlled ? setCurrentValue : undefined}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      markers={markers}
      valueLabel={valueLabel}
      minLabel={minLabel}
      maxLabel={maxLabel}
      thumbNames={thumbNames}
      formatOptions={formatOptions}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onChangeEnd={onChangeEnd}
    />
  );
}
