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

interface SelectionContextValue {
  kind: 'checkbox' | 'radio' | null;
  isHovered: boolean;
  isPressed: boolean;
}

const SelectionContext = createContext<SelectionContextValue>({ kind: null, isHovered: false, isPressed: false });

/** Card-owned selection, interaction, and text context, below the native field provider. */
export function SelectionProvider({ children, ...value }: SelectionContextValue & { children: ReactNode }) {
  const text = useContext(TextContext);
  const slots = text && 'slots' in text ? text.slots : undefined;

  return (
    <SelectionContext.Provider value={value}>
      <TextContext.Provider value={{ slots: { ...slots, [DEFAULT_SLOT]: {} } }}>{children}</TextContext.Provider>
    </SelectionContext.Provider>
  );
}

/** Props for the visual indicator of a Card's native selection control. */
export interface CardSelectionIndicatorProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'dangerouslySetInnerHTML' | 'aria-hidden'> {
  /** Custom visual content or a state render function. Omit for the default circular indicator. */
  children?: ReactNode | ((renderProps: CardSelectionIndicatorRenderProps) => ReactNode);

  /** Additional CSS class for the indicator. */
  className?: string;
}

/** Native selection state available to custom indicator content. */
export interface CardSelectionIndicatorRenderProps {
  /** Whether the card is selected. */
  isSelected: boolean;

  /** Whether selection is disabled. */
  isDisabled: boolean;

  /** Whether selection is read-only. */
  isReadOnly: boolean;

  /** Whether the selection control shows keyboard focus. */
  isFocusVisible: boolean;
}

/**
 * An explicitly placed visual for a Card's native selection control.
 *
 * @param props - {@link CardSelectionIndicatorProps}
 */
export const CardSelectionIndicator = forwardRef<HTMLSpanElement, CardSelectionIndicatorProps>(
  function CardSelectionIndicator({ className, children, ...props }, ref) {
    const { kind: control, isHovered, isPressed } = useContext(SelectionContext);
    const isCustom = children !== undefined;

    function renderIndicator({
      isSelected = false,
      isDisabled = false,
      isReadOnly = false,
      isFocusVisible = false
    }: Partial<CardSelectionIndicatorRenderProps> = {}) {
      const state = { isSelected, isDisabled, isReadOnly, isFocusVisible };

      return (
        <span
          {...props}
          ref={ref}
          aria-hidden="true"
          data-card-selection-indicator
          data-custom={isCustom || undefined}
          data-selected={state.isSelected || undefined}
          data-disabled={state.isDisabled || undefined}
          data-readonly={state.isReadOnly || undefined}
          data-focus-visible={state.isFocusVisible || undefined}
          data-hovered={isHovered || undefined}
          data-pressed={isPressed || undefined}
          className={composeClassName(className, styles.indicator)}
        >
          {isCustom ? (
            typeof children === 'function' ? (
              children(state)
            ) : (
              children
            )
          ) : (
            <Icon icon="checkmark" className={styles.checkmark} aria-hidden="true" />
          )}
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
