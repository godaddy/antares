import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from 'react';
import {
  CheckboxButton as RACCheckboxButton,
  RadioButton as RACRadioButton,
  type CheckboxButtonRenderProps,
  type RadioButtonRenderProps
} from 'react-aria-components';
import { Icon } from '#components/icon';
import { composeClassName } from '#utils/render-props.ts';
import styles from './card-selection-indicator.module.css';

export const CardSelectionControlContext = createContext<'checkbox' | 'radio' | null>(null);

export interface CardSelectionIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /** Keep the indicator visible when the Card is not hovered or focused. */
  visibility?: 'auto' | 'always';
}

/** A circular, explicitly placed visual for a Card's native selection control. */
export const CardSelectionIndicator = forwardRef<HTMLSpanElement, CardSelectionIndicatorProps>(
  function CardSelectionIndicator({ className, visibility = 'auto', onClick, ...props }, ref) {
    const control = useContext(CardSelectionControlContext);

    const indicator = (state: CheckboxButtonRenderProps | RadioButtonRenderProps, extra?: ReactNode) => (
      <span
        {...props}
        ref={ref}
        aria-hidden="true"
        data-card-selection-indicator
        data-selected={state.isSelected || undefined}
        data-indeterminate={'isIndeterminate' in state && state.isIndeterminate ? true : undefined}
        data-disabled={state.isDisabled || undefined}
        data-readonly={state.isReadOnly || undefined}
        data-focus-visible={state.isFocusVisible || undefined}
        data-visibility={visibility}
        className={composeClassName(className, styles.indicator)}
        onClick={onClick}
      >
        {extra ??
          ('isIndeterminate' in state && state.isIndeterminate ? (
            <Icon icon="minus" aria-hidden="true" />
          ) : (
            <Icon icon="checkmark" className={styles.checkmark} aria-hidden="true" />
          ))}
      </span>
    );

    if (control === 'checkbox') {
      return (
        <RACCheckboxButton data-card-selection-control className={styles.control}>
          {(state) => indicator(state)}
        </RACCheckboxButton>
      );
    }

    if (control === 'radio') {
      return (
        <RACRadioButton data-card-selection-control className={styles.control}>
          {(state) => indicator(state)}
        </RACRadioButton>
      );
    }

    return indicator({
      isSelected: false,
      isIndeterminate: false
    } as CheckboxButtonRenderProps);
  }
);
