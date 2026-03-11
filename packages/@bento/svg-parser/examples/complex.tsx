import { parser } from '@bento/svg-parser';

/**
 * Complex SVG Parser Example
 *
 * This example demonstrates a more complex usage of the SVG parser with
 * both custom node transformations and custom props transformations.
 * It shows how to:
 * - Transform custom elements into standard SVG elements
 * - Transform custom attributes into React props
 * - Apply both transformations simultaneously
 */
const svgWithComplexFeatures = `
<svg width="200" height="200">
  <custom-shape x="50" y="50" size="100" stroke-width="2" class="purple-box" />
  <special-element type="circle" radius="40" stroke-width="3" class="orange-circle" />
  <rect x="10" y="10" width="50" height="50" stroke-width="1" class="blue-box" />
</svg>
`;

export function ComplexExample() {
  const parsedSvg = parser(svgWithComplexFeatures, {
    // Custom node transformations
    nodes: {
      'custom-shape': (node) => [
        'rect',
        {
          x: node.getAttribute('x'),
          y: node.getAttribute('y'),
          width: node.getAttribute('size'),
          height: node.getAttribute('size'),
          fill: 'purple',
          rx: '8',
          strokeWidth: node.getAttribute('stroke-width'),
          className: node.getAttribute('class')
        }
      ],
      'special-element': (node) => [
        'circle',
        {
          cx: '100',
          cy: '100',
          r: node.getAttribute('radius'),
          fill: 'orange',
          strokeWidth: node.getAttribute('stroke-width'),
          className: node.getAttribute('class')
        }
      ]
    },
    // Custom props transformations
    props: {
      'stroke-width': (node) => ['strokeWidth', node.getAttribute('stroke-width')!],
      class: (node) => ['className', node.getAttribute('class')!]
    }
  });
  return parsedSvg;
}
