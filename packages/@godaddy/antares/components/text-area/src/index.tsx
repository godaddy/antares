import { forwardRef } from 'react';
import {
  TextArea as RACTextArea,
  TextAreaContext,
  type TextAreaProps as RACTextAreaProps
} from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export { TextAreaContext };

export interface TextAreaProps extends RACTextAreaProps, BoxOwnProps {}

/**
 * RAC `TextArea` with fill layout. Field injects chrome via RAC `TextAreaContext`.
 *
 * @param props - {@link TextAreaProps}
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
  return <Box flex={1} {...props} as={RACTextArea} ref={ref} />;
});
