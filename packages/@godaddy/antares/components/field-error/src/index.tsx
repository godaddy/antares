import { forwardRef } from 'react';
import {
  FieldError as RACFieldError,
  FieldErrorContext as RACFieldErrorContext,
  type FieldErrorProps as RACFieldErrorProps
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export const FieldErrorContext = RACFieldErrorContext;

export interface FieldErrorProps extends RACFieldErrorProps {}

/**
 * Field error message; renders only when the field is invalid.
 *
 * @param props - {@link FieldErrorProps}
 */
export const FieldError = forwardRef<HTMLElement, FieldErrorProps>(function FieldError(props, ref) {
  const { className, ...rest } = props;
  return <RACFieldError {...rest} ref={ref} className={composeClassName(className, styles.fieldError)} />;
});
