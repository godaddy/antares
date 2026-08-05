import { RangeField, type RangeFieldProps, type RangeFieldRef } from '@godaddy/antares';
import { type ReactNode, type Ref, useEffect, useMemo, useState } from 'react';

export interface PlaygroundExampleProps {
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

function normalizeStorybookValue(value: unknown): number | number[] | undefined {
  if (typeof value === 'number' || Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);

    if (
      entries.length &&
      entries.every(function isIndexedValue([key, entry]) {
        return /^\d+$/.test(key) && typeof entry === 'number';
      })
    ) {
      return entries
        .sort(function sortByIndex([firstKey], [secondKey]) {
          return Number(firstKey) - Number(secondKey);
        })
        .map(function getValue([, entry]) {
          return entry as number;
        });
    }
  }

  return undefined;
}

export function PlaygroundExample({
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
}: PlaygroundExampleProps) {
  const normalizedValue = useMemo(
    function normalizeValue() {
      return normalizeStorybookValue(value);
    },
    [value]
  );
  const normalizedDefaultValue = useMemo(
    function normalizeDefaultValue() {
      return normalizeStorybookValue(defaultValue) ?? 50;
    },
    [defaultValue]
  );
  const [currentValue, setCurrentValue] = useState<number | number[]>(normalizedValue ?? normalizedDefaultValue);
  const isControlled = normalizedValue !== undefined;
  const displayedValue = isControlled ? currentValue : normalizedDefaultValue;
  const defaultValueKey = Array.isArray(normalizedDefaultValue)
    ? normalizedDefaultValue.join('-')
    : normalizedDefaultValue;

  useEffect(
    function synchronizeControlledValue() {
      if (normalizedValue !== undefined) {
        setCurrentValue(normalizedValue);
      }
    },
    [normalizedValue]
  );

  if (Array.isArray(displayedValue)) {
    const arrayDefaultValue = Array.isArray(normalizedDefaultValue) ? normalizedDefaultValue : [normalizedDefaultValue];
    const accessibleThumbLabels =
      thumbLabels ??
      displayedValue.map(function createThumbLabel(_, index) {
        return `Value ${index + 1}`;
      });

    return (
      <RangeField<number[]>
        ref={rootRef}
        key={isControlled ? 'controlled' : `uncontrolled-${defaultValueKey}`}
        label={label}
        description={description}
        value={isControlled ? displayedValue : undefined}
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

  const scalarDefaultValue = Array.isArray(normalizedDefaultValue) ? normalizedDefaultValue[0] : normalizedDefaultValue;

  return (
    <RangeField<number>
      ref={rootRef}
      key={isControlled ? 'controlled' : `uncontrolled-${defaultValueKey}`}
      label={label}
      description={description}
      value={isControlled ? displayedValue : undefined}
      defaultValue={isControlled ? undefined : scalarDefaultValue}
      onChange={isControlled ? setCurrentValue : undefined}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      markers={markers}
      valueLabel={valueLabel}
      minLabel={minLabel}
      maxLabel={maxLabel}
      thumbLabels={thumbLabels}
      thumbNames={thumbNames}
      formatOptions={formatOptions}
      isRequired={isRequired}
      isDisabled={isDisabled}
      onChangeEnd={onChangeEnd}
    />
  );
}
