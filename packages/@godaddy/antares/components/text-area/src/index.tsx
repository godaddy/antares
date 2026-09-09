import { forwardRef } from 'react';
import {
  TextArea as RACTextArea,
  TextAreaContext as RACTextAreaContext,
  type TextAreaProps as RACTextAreaProps
} from 'react-aria-components';
import { Box, type BoxOwnProps } from '#components/layout/box';

export const TextAreaContext = RACTextAreaContext;

export interface TextAreaProps extends RACTextAreaProps, Omit<BoxOwnProps, 'as'> {}

/** Multiline text control for use inside a field. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
  return <Box {...props} as={RACTextArea} ref={ref} />;
});
