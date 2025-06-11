import { parser } from '@bento/svg-parser';

/**
 * Custom Props Transformation Example
 *
 * This example demonstrates how to transform SVG attributes using custom prop transformations.
 * It shows how to:
 * - Convert 'class' to 'className'
 * - Convert 'stroke-width' to 'strokeWidth'
 */
const svgWithCustomProps = `
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke-width="2" class="custom-circle" />
</svg>
`;

export function CustomPropsExample() {
  const parsedSvg = parser(svgWithCustomProps, {
    props: {
      // Transform 'class' attribute to 'className'
      class: (node) => ['className', node.getAttribute('class')!],
      // Transform 'stroke-width' to 'strokeWidth'
      'stroke-width': (node) => ['strokeWidth', node.getAttribute('stroke-width')!]
    }
  });
  return parsedSvg;
}
