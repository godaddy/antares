import { forwardRef, type Ref } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';

import { useTypography, type TypographyProps } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';

export const LabelContext = RACLabelContext;

export interface LabelProps extends Omit<RACLabelProps, 'elementType'>, TypographyProps {
  /** Label content. */
  children?: RACLabelProps['children'];
}

/** Names a form field. */
export const Label = forwardRef<HTMLElement, LabelProps>(function Label(props, ref) {
  const { size, emphasis, className, ...rest } = props;
  const typography = useTypography('label', props);
  return <RACLabel {...rest} ref={ref as Ref<HTMLLabelElement>} className={composeClassName(className, typography)} />;
});
