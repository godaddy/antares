import { parser } from '@bento/svg-parser';

/**
 * Basic SVG parsing example
 *
 * This example demonstrates the simplest usage of the svg-parser.
 * It takes a basic SVG string and converts it to a React element.
 *
 * Usage:
 * ```tsx
 * import { BasicExample } from './examples/basic';
 *
 * function App() {
 *   return <BasicExample />;
 * }
 * ```
 */
const basicSvg = `
<svg width="100" height="100">
  <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>
`;

export function BasicExample() {
  const parsedSvg = parser(basicSvg);
  return parsedSvg;
}
