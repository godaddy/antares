import React, { useId, type SVGProps, type ReactElement } from 'react';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type AriaLabelingProps } from '@react-types/shared';
import { transformers, toViewBox } from './transformers.tsx';
import { useRenderProps } from '@bento/use-render-props';
import { withSlots, type Slots } from '@bento/slots';

/**
 * Interface representing the properties of an Illustration component.
 *
 * @interface IllustrationProps
 * @extends {Slots}
 * @extends {AriaLabelingProps}
 * @extends {SVGProps<SVGSVGElement>}
 * @property {React.ReactElement<SVGSVGElement>} children - The content to display. Should be an SVG.
 * @property {string} [title] - A screen reader only label for the Illustration.
 * @property {90 | 180 | 270} [rotate] - Rotate the illustration by 90, 180, or 270 degrees.
 * @property {'horizontal' | 'vertical'} [flip] - Flip the illustration horizontally, vertically, or both.
 */
export interface IllustrationProps extends SVGProps<SVGSVGElement>, AriaLabelingProps, Slots {
  children: ReactElement<SVGSVGElement>;
  title?: string;
  rotate?: 90 | 180 | 270;
  flip?: 'horizontal' | 'vertical';
}

/**
 * Illustration component that renders an SVG with optional transformations and accessibility features.
 *
 * @param {IllustrationProps} args - The properties passed to the Illustration component.
 * @param {React.ReactNode} args.children - The SVG element to be rendered.
 * @param {string} [args.title] - The title for the SVG, used for accessibility.
 * @param {number} [args.rotate] - The rotation angle for the SVG, can be 90, 180, or 270.
 * @param {string} [args.flip] - The flip direction for the SVG, can be "horizontal" or "vertical".
 * @param {Object} [args.rest] - Additional properties to be spread onto the SVG element.
 * @returns {React.ReactElement} The rendered Illustration component.
 * @public
 */
export const Illustration: React.FC<IllustrationProps> = withSlots(
  'BentoIllustration',
  function Illustrated(args: IllustrationProps) {
    const id = useId();
    const [props, apply] = useRenderProps(args);
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
  }
);
