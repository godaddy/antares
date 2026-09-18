import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react';
import {
  CheckboxButton as RACCheckboxButton,
  RadioButton as RACRadioButton,
  DEFAULT_SLOT,
  TextContext
} from 'react-aria-components';
import { Icon } from '#components/icon';
import { composeClassName } from '#utils/render-props.ts';
import styles from './card-selection-indicator.module.css';

const SelectionContext = createContext<'checkbox' | 'radio' | null>(null);

/** Card-owned selection and text context, below the native field provider. */
export function SelectionProvider({ kind, children }: { kind: 'checkbox' | 'radio' | null; children: ReactNode }) {
  const text = useContext(TextContext);
  const slots = text && 'slots' in text ? text.slots : undefined;

  return (
    <SelectionContext.Provider value={kind}>
      <TextContext.Provider value={{ slots: { ...slots, [DEFAULT_SLOT]: {} } }}>{children}</TextContext.Provider>
    </SelectionContext.Provider>
  );
}

/** Props for the visual indicator of a Card's native selection control. */
export interface CardSelectionIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS class for the indicator. */
  className?: string;
}

interface IndicatorState {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFocusVisible?: boolean;
}

/**
 * A circular, explicitly placed visual for a Card's native selection control.
 *
 * @param props - {@link CardSelectionIndicatorProps}
 */
export const CardSelectionIndicator = forwardRef<HTMLSpanElement, CardSelectionIndicatorProps>(
  function CardSelectionIndicator({ className, ...props }, ref) {
    const control = useContext(SelectionContext);

    function renderIndicator(state: IndicatorState = {}) {
      return (
        <span
          {...props}
          ref={ref}
          aria-hidden="true"
          data-card-selection-indicator
          data-selected={state.isSelected || undefined}
          data-indeterminate={state.isIndeterminate || undefined}
          data-disabled={state.isDisabled || undefined}
          data-readonly={state.isReadOnly || undefined}
          data-focus-visible={state.isFocusVisible || undefined}
          className={composeClassName(className, styles.indicator)}
        >
          <Icon
            icon={state.isIndeterminate ? 'minus' : 'checkmark'}
            className={state.isIndeterminate ? undefined : styles.checkmark}
            aria-hidden="true"
          />
        </span>
      );
    }

    if (control === 'checkbox') {
      return (
        <RACCheckboxButton data-card-selection-control className={styles.control}>
          {renderIndicator}
        </RACCheckboxButton>
      );
    }

    if (control === 'radio') {
      return (
        <RACRadioButton data-card-selection-control className={styles.control}>
          {renderIndicator}
        </RACRadioButton>
      );
    }

    return renderIndicator();
  }
);
