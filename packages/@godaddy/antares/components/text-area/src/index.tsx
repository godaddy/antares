import { forwardRef } from 'react';
import {
  TextArea as RACTextArea,
  TextAreaContext as RACTextAreaContext,
  type TextAreaProps as RACTextAreaProps
} from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export const TextAreaContext = RACTextAreaContext;

export interface TextAreaProps extends RACTextAreaProps, Omit<BoxOwnProps, 'as'> {}

/** Multiline input. Field injects chrome via TextAreaContext. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
  return <Box flex={1} {...props} as={RACTextArea} ref={ref} />;
});
