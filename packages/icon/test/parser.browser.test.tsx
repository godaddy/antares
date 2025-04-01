import { parser } from '@bento/icon/parser';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/icon/parser', function bento() {
  it('is a function', function isFunction() {
    assume(parser).is.a('function');
  });

  it('parses the icon name', function name() {
    const result = parser('<svg xmlns="http://www.w3.org/2000/svg"><path d="M3 22v-20l18 10-18 10z"></svg>');

    assume(result).is.a('object');
    assume(result.type).equals('svg');
    assume(result.props.children).is.a('array');

    const path = result.props.children[0];
    assume(path.type).equals('path');
    assume(path.props.d).equals('M3 22v-20l18 10-18 10z');
  });

  it('automatically transforms attributes to camelCase', function camelCase() {
    const result = parser(
      '<svg xmlns="http://www.w3.org/2000/svg"><path stroke-width="2" d="M3 22v-20l18 10-18 10z"></svg>'
    );

    assume(result).is.a('object');
    assume(result.props.xmlns).equals('http://www.w3.org/2000/svg');

    const path = result.props.children[0];
    assume(path.props.strokeWidth).equals('2');
  });

  describe('#props', function props() {
    it('allows the transformation of attributes', function transform() {
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><path class="foo-bar" stroke-width="2" d="M3 22v-20l18 10-18 10z"></svg>',
        {
          props: {
            class: function modify(node) {
              return ['className', node.getAttribute('class')];
            }
          }
        }
      );

      const path = result.props.children[0];
      assume(path.props.className).equals('foo-bar');
    });

    it('can override the value of the attribute', function override() {
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><path class="foo-bar" stroke-width="2" d="M3 22v-20l18 10-18 10z"></svg>',
        {
          props: {
            class: function modify() {
              return ['className', 'bar-foo'];
            }
          }
        }
      );

      const path = result.props.children[0];
      assume(path.props.className).equals('bar-foo');
    });
  });

  describe('#nodes', function nodes() {
    it('allows the transformation of nodes', function transform() {
      const result = parser('<svg xmlns="http://www.w3.org/2000/svg"><g><path d="M3 22v-20l18 10-18 10z"></g></svg>', {
        nodes: {
          g: function modify() {
            return ['div'];
          }
        }
      });

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const div = result.props.children[0];
      assume(div.type).equals('div');

      assume(div.props.children).is.a('array');
      const path = div.props.children[0];
      assume(path.type).equals('path');
    });

    it('can override introdce additional props', function override() {
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><g fill="red"><path d="M3 22v-20l18 10-18 10z"></g></svg>',
        {
          nodes: {
            g: function modify(node) {
              assume(node.getAttribute('fill')).equals('red');

              return ['div', { id: 'foo' }];
            }
          }
        }
      );

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const div = result.props.children[0];
      assume(div.type).equals('div');
      assume(div.props.id).equals('foo');

      assume(div.props.children).is.a('array');
      const path = div.props.children[0];
      assume(path.type).equals('path');
    });

    it('can override the type of the node with a custom component', function override() {
      function Custom() {
        /* intentionally empty */
      }
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><g fill="red"><path d="M3 22v-20l18 10-18 10z"></g></svg>',
        {
          nodes: {
            g: function modify() {
              return [Custom, {}];
            }
          }
        }
      );

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const div = result.props.children[0];
      assume(div.type).equals(Custom);
    });
  });
});
