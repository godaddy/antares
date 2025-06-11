import { createElement, type JSX } from 'react';
import camelCase from 'camelcase';

/**
 * Options for configuring the parser.
 *
 * @interface ParserOptions
 * @property {Record<string, (node: Element) => [string, object]>} [nodes] -
 * An optional record of node parsers. Each key is a string representing the node type,
 * and the value is a function that takes an `Element` and returns a tuple containing
 * a string and an object: the string is the component name, and the object is the component props.
 *
 * @property {Record<string, (node: Element) => [string, string]>} [props] -
 * An optional record of property parsers. Each key is a string representing the property name,
 * and the value is a function that takes an `Element` and returns a tuple containing
 * two strings: the first is the property name, and the second is the property value.
 */
export interface ParserOptions {
  nodes?: Record<string, (node: Element) => [string, object]>;
  props?: Record<string, (node: Element) => [string, string]>;
}

/**
 * Transform SVG strings into the React.createElement counterparts.
 *
 * @param {string} source - The SVG string to be transformed.
 * @param {ParserOptions} options - The options to be used for the transformation.
 * @param {Record<string, (node: Element) => [string, object]>} options.nodes - The custom node transformation functions.
 * @param {Record<string, (node: Element) => [string, string]>} options.props - The custom prop transformation functions.
 * @returns {JSX.Element} Transformed SVG string.
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
   * @param {NodeList} children - The list of child nodes to convert into JSX elements.
   * @returns {Array<JSX.Element>} An array of JSX elements created from the given NodeList.
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
