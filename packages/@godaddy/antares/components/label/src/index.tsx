import { forwardRef, type Ref } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';
import { useTypographyClassName, type TypographyProps } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';

export const LabelContext = RACLabelContext;

export interface LabelProps extends Omit<RACLabelProps, 'elementType'>, TypographyProps {
  /** Label content. */
  children?: RACLabelProps['children'];
}

/** Names a form field. */
export const Label = forwardRef<HTMLElement, LabelProps>(function Label(props, ref) {
  const { className, size, emphasis, ...rest } = props;
  const typography = useTypographyClassName('label', { size, emphasis });

  return <RACLabel {...rest} ref={ref as Ref<HTMLLabelElement>} className={composeClassName(className, typography)} />;
});
