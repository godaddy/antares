import { createContext, forwardRef, type ReactNode } from 'react';
import { type ContextValue, type ProgressBarRenderProps, useContextProps } from 'react-aria-components';
import { Text, type TextProps } from '#components/text';
import { textTreatmentClassName } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';
import { useProgressBarState } from './state.ts';
import styles from './progress-bar-value.module.css';

export interface ProgressBarValueProps extends Omit<TextProps, 'children'> {
  /** Visible value content. Omit for formatted value text, or use a function to read progress state. */
  children?: ReactNode | ((state: ProgressBarRenderProps) => ReactNode);
}

export const ProgressBarValueContext = createContext<ContextValue<ProgressBarValueProps, HTMLElement>>(null);

/** Optional visible value output. Hidden while progress is indeterminate. */
export const ProgressBarValue = forwardRef<HTMLElement, ProgressBarValueProps>(function ProgressBarValue(props, ref) {
  [props, ref] = useContextProps(props, ref, ProgressBarValueContext);
  const { children, className, ...rest } = props;
  const state = useProgressBarState();
  if (state.isIndeterminate) return null;
  const content =
    typeof children === 'function' ? children(state) : children === undefined ? state.valueText : children;
  if (content == null || content === false) return null;

  return (
    <Text
      slot={null}
      {...rest}
      ref={ref}
      className={composeClassName(className, styles.value, textTreatmentClassName('inherit'))}
    >
      {content}
    </Text>
  );
});
