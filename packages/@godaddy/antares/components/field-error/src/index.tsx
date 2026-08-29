import {
  FieldError as RACFieldError,
  FieldErrorContext,
  type FieldErrorProps as RACFieldErrorProps
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export { FieldErrorContext };

export interface FieldErrorProps extends RACFieldErrorProps {}

/**
 * Field error message; renders only when the field is invalid.
 *
 * @param props - {@link FieldErrorProps}
 */
export function FieldError(props: FieldErrorProps) {
  const { className, ...rest } = props;
  return <RACFieldError {...rest} className={composeClassName(className, styles.fieldError)} />;
}
