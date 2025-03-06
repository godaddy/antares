import { useDataAttributes } from '../src/index.ts';
import { Container } from '../examples/container.tsx';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/use-data-attributes', function bento() {
  describe('#useDataAttributes', function useDataAttributesSuite() {
    /**
     * Renders a React component to a string.
     *
     * @param {Object} props - The properties to pass to the React component.
     * @returns {string} The rendered HTML string.
     */
    function render(props: object): string {
      return renderToString(React.createElement(Container, props, 'hello world'));
    }

    it('is a function', function test() {
      assume(useDataAttributes).is.a('function');
    });

    it('does not prefix existing data- attributes', function test() {
      const result = render({ 'data-foo': 'bar', 'data-baz': 42 });
      assume(result).includes('data-foo="bar" data-baz="42"');
    });

    it('automatically prefixes keys with data- when missing', function test() {
      const result = render({ foo: 'bar', baz: 42 });
      assume(result).includes('data-foo="bar" data-baz="42"');
    });

    it('dashes the keys', function test() {
      const result = render({ fooBar: 'baz', 'another option': true });
      assume(result).includes('data-foo-bar="baz" data-another-option="true"');
    });

    it('renders complex objects', function test() {
      const result = render({ foo: { bar: 'baz' }, baz: [1, 2, 3] });
      assume(result).includes('data-foo="bar(baz)" data-baz="1 2 3"');
    });

    it('does not render null or undefined values', function test() {
      const result = render({ foo: null, baz: undefined });
      assume(result).equals('<div data-loading="true" data-override="style className slots">hello world</div>');
    });
  });
});
