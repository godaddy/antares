import React, { useId, type SVGProps, type ReactElement } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type AriaLabelingProps } from '@react-types/shared';
import { transformers, toViewBox } from './transformers.tsx';
import { withSlots, type Slots } from '@bento/slots';
import { useProps } from '@bento/use-props';

export interface IllustrationProps extends SVGProps<SVGSVGElement>, AriaLabelingProps, Slots {
  /** The content to display. Should be an SVG. */
  children: ReactElement<SVGSVGElement>;

  /**
   * Screen reader accessible title that explains the illustration.
   * Introducing this property automatically changes the `role` attribute from `presentation` to `img`.
   */
  title?: string;

  /** Rotate the illustration by 90, 180, or 270 degrees. */
  rotate?: 90 | 180 | 270;

  /** Flip the illustration horizontally or vertically. */
  flip?: 'horizontal' | 'vertical';
}

/**
 * Illustration component that renders an SVG with optional transformations and accessibility features.
 *
 * @param args - The properties passed to the Illustration component.
 * @returns The rendered Illustration component.
 * @public
 */
export const Illustration = withSlots('BentoIllustration', function Illustrated(args: IllustrationProps) {
  const id = useId();
  const { props, apply } = useProps(args);
  const { title, children, rotate, flip, ...rest } = props;
  const svgProps = children.props;

  //
  // We need to know the viewBox in order to correctly apply transformations
  // to the SVG. If the viewBox is not provided then we will do a best effort
  // to generate one by assuming that this information is provided to us using
  // the component props.
  //
  const { viewBox, drawings } = transformers(
    {
      viewBox:
        svgProps.viewBox ||
        toViewBox({
          height: props.height || 24,
          width: props.width || 24,
          left: props.x || 0,
          top: props.y || 0
        }),
      rotate,
      flip
    },
    svgProps.children
  );

  return React.cloneElement(
    children,
    {
      //
      // We cannot use the @react-aria/utils/filterDOMProps function here
      // because it will remove valid SVG attributes. We will spread the
      // all the props instead without any filtering.
      //
      ...rest,
      ...apply({
        'aria-labelledby': title ? id : undefined,
        role: title ? 'img' : 'presentation',
        viewBox: toViewBox(viewBox),
        focusable: false
      }),

      ...useDataAttributes({
        rotate,
        flip
      })
    },
    <>
      {title && <title id={id}>{title}</title>}
      {drawings}
    </>
  );
});
