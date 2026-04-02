import { parser } from '@bento/svg-parser';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@bento/svg-parser browser', function bento() {
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
              return ['className', node.getAttribute('class') ?? ''];
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
            return ['div', {}];
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
              return [Custom as unknown as string, {}];
            }
          }
        }
      );

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const div = result.props.children[0];
      assume(div.type).equals(Custom);
    });

    it('preserves a key when the node transformer provides one', function preserveKey() {
      const result = parser('<svg xmlns="http://www.w3.org/2000/svg"><g><path d="M3 22v-20l18 10-18 10z"></g></svg>', {
        nodes: {
          g: function modify() {
            return ['div', { key: 'custom-key' }];
          }
        }
      });

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const div = result.props.children[0];
      assume(div.type).equals('div');
      assume(div.key).equals('custom-key');
    });

    it('handles multiple node types with mixed transformations', function multipleNodes() {
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><g><rect width="10" height="10"></rect></g><circle cx="5" cy="5" r="5"></circle></svg>',
        {
          nodes: {
            g: function modify() {
              return ['div', { key: 'group-key' }];
            }
          }
        }
      );

      assume(result).is.a('object');
      assume(result.type).equals('svg');

      const children = result.props.children;
      assume(children).is.a('array');
      assume(children).is.length(2);

      assume(children[0].type).equals('div');
      assume(children[0].key).equals('group-key');

      assume(children[1].type).equals('circle');
      assume(children[1].key).equals('circle-1');
    });
  });

  describe('#props edge cases', function propsEdgeCases() {
    it('skips attributes when a prop transformer returns an empty name', function emptyName() {
      const result = parser(
        '<svg xmlns="http://www.w3.org/2000/svg"><path data-remove="yes" d="M3 22v-20l18 10-18 10z"></svg>',
        {
          props: {
            'data-remove': function modify() {
              return ['', 'ignored'];
            }
          }
        }
      );

      const path = result.props.children[0];

      assume(path.props['']).equals(undefined);
      assume(path.props.d).equals('M3 22v-20l18 10-18 10z');
    });
  });
});
