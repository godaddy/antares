/* v8 ignore next */
import { createElement, type JSX } from 'react';
import camelCase from 'camelcase';

/**
 * Options for configuring the parser.
 */
export interface ParserOptions {
  /**
   * Custom node transformation functions. Each key is an SVG element name to
   * transform, and the value is a function that returns [componentName, props]
   */
  nodes?: Record<string, (node: Element) => [string, object]>;

  /**
   * Custom property transformation functions. Each key is an SVG attribute name to
   * transform, and the value is a function that returns [propName, propValue]
   */
  props?: Record<string, (node: Element) => [string, string]>;
}

/**
 * Transform SVG strings into the React.createElement counterparts.
 *
 * @param source - The SVG string to be transformed.
 * @param options - The options to be used for the transformation.
 * @returns Transformed SVG string.
 * @example
 * parser('<svg><rect x="10" y="10" width="100" height="100" stroke-width="2" class="hello" /></svg>', {
 *   props: {
 *     class: (node) => ['className', node.getAttribute('class')]
 *   }
 * });
 * // <svg><rect x="10" y="10" width="100" height="100" strokeWidth="2" className="hello" /></svg>
 * @public
 */
export function parser(source: string, { nodes = {}, props = {} }: ParserOptions = {}): JSX.Element {
  /**
   * Creates an array of JSX elements from a given NodeList.
   *
   * @param children - The list of child nodes to convert into JSX elements.
   * @returns An array of JSX elements created from the given NodeList.
   * @public
   */
  function create(children: NodeList): Array<JSX.Element> {
    return Array.from(children)
      .filter((node): node is Element => node.nodeType === Node.ELEMENT_NODE)
      .map(function createChildren(node: Element, i: number): JSX.Element {
        const { nodeName, attributes, childNodes } = node;
        let attrs: Record<string, any> = {};
        let Component = nodeName;

        if (nodeName in nodes) [Component, attrs] = nodes[nodeName](node);
        /* v8 ignore next */
        if (!attrs) attrs = {};
        if (!attrs.key) attrs.key = `${nodeName}-${i}`;

        return createElement(
          Component,
          Array.from(attributes)
            .map((attr) => attr.name)
            .reduce(function createProps(memo: Record<string, any>, name: string) {
              let value = node.getAttribute(name);

              if (name in props) [name, value] = props[name](node);
              else name = camelCase(name);

              if (name) memo[name] = value;
              return memo;
            }, attrs),
          create(childNodes)
        );
      });
  }

  return create(new DOMParser().parseFromString(source, 'image/svg+xml').querySelectorAll('svg'))[0];
}
