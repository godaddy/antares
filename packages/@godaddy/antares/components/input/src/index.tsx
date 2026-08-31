import { forwardRef } from 'react';
import {
  Input as RACInput,
  InputContext as RACInputContext,
  type InputProps as RACInputProps
} from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export const InputContext = RACInputContext;

export interface InputProps extends RACInputProps, Omit<BoxOwnProps, 'as'> {}

/**
 * Single-line input that fills a Group. Field injects chrome via InputContext.
 *
 * @param props - {@link InputProps}
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <Box flex={1} {...props} as={RACInput} ref={ref} />;
});
