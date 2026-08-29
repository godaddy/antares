import { forwardRef } from 'react';
import { Input as RACInput, InputContext, type InputProps as RACInputProps } from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export { InputContext };

export interface InputProps extends RACInputProps, BoxOwnProps {}

/**
 * RAC `Input` with fill layout. Field injects chrome via RAC `InputContext`.
 *
 * @param props - {@link InputProps}
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <Box flex={1} {...props} as={RACInput} ref={ref} />;
});
