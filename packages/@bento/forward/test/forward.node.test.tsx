import { withForwardRef } from '@bento/forward';
import { BasicExample } from '../examples/basic.tsx';
import { AlreadyWrapped } from '../examples/already-wrapped.tsx';
import { NoRef } from '../examples/no-ref.tsx';
import { RestParams } from '../examples/rest-params.tsx';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';
import React, { forwardRef } from 'react';

describe('@bento/forward', function bento() {
  describe('withForwardRef', function withForward() {
    it('is a function', function fn() {
      assume(withForwardRef).is.a('function');
    });

    it('returns the component unchanged if it already uses forwardRef', function alreadyForwarded() {
      const Component = forwardRef(function Component(props: any, ref: React.ForwardedRef<HTMLDivElement>) {
        return <div ref={ref}>{props.children}</div>;
      });

      const wrapped = withForwardRef(Component);

      // Should return the same component since it's already using forwardRef (it's an object, not a function)
      assume(wrapped).equals(Component);
    });

    it('returns the component unchanged if it does not accept a ref parameter', function noRef() {
      const Component = function Component(props: any) {
        return <div>{props.children}</div>;
      };

      const wrapped = withForwardRef(Component);

      // Should return the same component since it doesn't accept a ref
      assume(wrapped).equals(Component);
    });

    it('wraps the component with forwardRef if it accepts a ref parameter in React 18', function needsWrapping() {
      const Component = function Component(props: any, ref: React.ForwardedRef<HTMLDivElement>) {
        return <div ref={ref}>{props.children}</div>;
      };

      const wrapped = withForwardRef(Component);

      // In React 18, should wrap the component (forwardRef returns an object)
      assume(wrapped).is.not.equals(Component);
      assume(typeof wrapped).equals('object');
    });

    it('returns component unchanged in React 19 even if it accepts a ref parameter', function react19() {
      // Mock React.version for this test
      const originalVersion = React.version;
      Object.defineProperty(React, 'version', {
        value: '19.0.0',
        writable: true,
        configurable: true
      });

      try {
        const Component = function Component(props: any, ref: React.ForwardedRef<HTMLDivElement>) {
          return <div ref={ref}>{props.children}</div>;
        };

        const wrapped = withForwardRef(Component);

        // In React 19, should NOT wrap the component
        assume(wrapped).equals(Component);
      } finally {
        // Restore original version
        Object.defineProperty(React, 'version', {
          value: originalVersion,
          writable: true,
          configurable: true
        });
      }
    });

    it('handles edge case: component with exactly 1 parameter', function oneParam() {
      const Component = function Component(props: any) {
        return <div>{props.children}</div>;
      };

      assume(Component.length).equals(1);

      const wrapped = withForwardRef(Component);

      // Should not wrap since length is not > 1
      assume(wrapped).equals(Component);
    });

    it('wraps components with 0 parameters (no-arg functions)', function zeroParams() {
      const Component = function Component() {
        return <div>No props</div>;
      };

      assume(Component.length).equals(0);

      const wrapped = withForwardRef(Component);

      // Should wrap since length === 0 (might be using rest parameters or no params)
      // Better to be safe and wrap than miss a component that needs ref forwarding
      assume(wrapped).is.not.equals(Component);
      assume(typeof wrapped).equals('object');
    });

    it('handles class components', function classComponent() {
      class Component extends React.Component {
        render() {
          return <div>{this.props.children}</div>;
        }
      }

      const wrapped = withForwardRef(Component);

      // Class components are functions, so they should be handled
      assume(wrapped).is.a('function');
    });

    it('handles non-function components (edge case)', function nonFunction() {
      // Create an object that looks like a component but isn't a function
      const Component = { $$typeof: Symbol.for('react.forward_ref'), render: () => null } as any;

      const wrapped = withForwardRef(Component);

      // Should return unchanged since it's not a function
      assume(wrapped).equals(Component);
    });

    it('wraps components using rest parameters for future useProps(...args) API', function restParams() {
      // Rest parameters don't count toward function.length, so length === 0
      const Component = function Component(...args: any[]) {
        return <div>{args[0]?.children}</div>;
      };

      assume(Component.length).equals(0);

      const wrapped = withForwardRef(Component);

      // Should wrap since length === 0 (rest parameters)
      // This supports future API: useProps(rest, state) where rest = [props, ref]
      assume(wrapped).is.not.equals(Component);
      assume(typeof wrapped).equals('object');
    });
  });

  describe('examples', function examples() {
    it('BasicExample is created with withForwardRef', function basic() {
      assume(BasicExample).is.not.null();
      assume(typeof BasicExample).equals('object'); // In React 18, it's wrapped
    });

    it('AlreadyWrapped is created with withForwardRef', function wrapped() {
      assume(AlreadyWrapped).is.not.null();
    });

    it('NoRef is created with withForwardRef', function noref() {
      assume(NoRef).is.not.null();
    });

    it('RestParams is created with withForwardRef', function restparams() {
      assume(RestParams).is.not.null();
      assume(typeof RestParams).equals('object'); // In React 18, it's wrapped
    });

    it('BasicExample renders to string', function rendersBasic() {
      const html = renderToString(<BasicExample>Test content</BasicExample>);
      assume(html).includes('Test content');
    });

    it('AlreadyWrapped renders to string', function rendersWrapped() {
      const html = renderToString(<AlreadyWrapped>Wrapped content</AlreadyWrapped>);
      assume(html).includes('Wrapped content');
    });

    it('NoRef renders to string', function rendersNoRef() {
      const html = renderToString(<NoRef>No ref content</NoRef>);
      assume(html).includes('No ref content');
    });

    it('RestParams renders to string', function rendersRestParams() {
      const html = renderToString(<RestParams>Rest params content</RestParams>);
      assume(html).includes('Rest params content');
    });
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });
});
