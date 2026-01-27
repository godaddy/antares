import { parser } from '@bento/svg-parser';

/**
 * Custom Nodes Transformation Example
 *
 * This example demonstrates how to transform custom SVG elements into React components.
 * It shows how to:
 * - Transform a custom-shape into a rectangle with specific styling
 * - Transform a special-element into a circle with dynamic properties
 */
const svgWithCustomNodes = `
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" />
  <special-element type="circle" radius="40" />
</svg>
`;

export function CustomNodesExample() {
  const parsedSvg = parser(svgWithCustomNodes, {
    nodes: {
      // Transform custom-shape to a rectangle with specific styling
      'custom-shape': (node) => [
        'rect',
        {
          x: node.getAttribute('x'),
          y: node.getAttribute('y'),
          width: node.getAttribute('size'),
          height: node.getAttribute('size'),
          fill: 'purple',
          rx: '8'
        }
      ],
      // Transform special-element to a circle with dynamic properties
      'special-element': (node) => [
        'circle',
        {
          cx: '100',
          cy: '100',
          r: node.getAttribute('radius'),
          fill: 'orange'
        }
      ]
    }
  });
  return parsedSvg;
}
