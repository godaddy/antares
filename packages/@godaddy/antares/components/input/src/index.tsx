import { forwardRef } from 'react';
import {
  Input as RACInput,
  InputContext as RACInputContext,
  type InputProps as RACInputProps
} from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export const InputContext = RACInputContext;

export interface InputProps extends RACInputProps, Omit<BoxOwnProps, 'as'> {}

/** Single-line text control for use inside a field. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <Box {...props} as={RACInput} ref={ref} />;
});
