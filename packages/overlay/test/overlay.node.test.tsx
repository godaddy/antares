import pkg from '../package.json' with { type: 'json' };
import { Overlay } from '@bento/overlay';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the Overlay component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the Overlay component.
 * @returns {string} The rendered string representation of the Overlay component.
 * @private
 */
function renderToStringWithChildren(args = {}) {
  return renderToString(<Overlay {...args} />);
}

describe('@bento/overlay', function bento() {
  it('exports the Overlay component', function exports() {
    assume(Overlay).is.a('object');
    assume(Overlay).has.property('$$typeof');
  });

  it('renders nothing when children is not provided', function noChildren() {
    const result = renderToStringWithChildren();
    assume(result).equals('');
  });

  it('renders children when provided and not open', function withChildrenClosed() {
    const result = renderToStringWithChildren({
      open: false,
      children: <div>Child content</div>
    });

    assume(result).includes('Child content');
  });

  it('renders children when provided and open', function withChildrenOpen() {
    const result = renderToStringWithChildren({
      open: true,
      children: <div>Child content</div>
    });

    assume(result).includes('Child content');
  });

  it('provides Box context to children', function boxContext() {
    const result = renderToStringWithChildren({
      open: true,
      children: <div data-testid="child">Content</div>
    });

    assume(result).includes('data-testid="child"');
    assume(result).includes('Content');
  });

  describe('Controlled state', function controlled() {
    it('respects the open prop when true', function openTrue() {
      const result = renderToStringWithChildren({
        open: true,
        children: <div>Open</div>
      });

      assume(result).includes('Open');
    });

    it('respects the open prop when false', function openFalse() {
      const result = renderToStringWithChildren({
        open: false,
        children: <div>Closed</div>
      });

      assume(result).includes('Closed');
    });
  });

  describe('Uncontrolled state', function uncontrolled() {
    it('uses defaultOpen when provided', function defaultOpenTrue() {
      const result = renderToStringWithChildren({
        defaultOpen: true,
        children: <div>Default open</div>
      });

      assume(result).includes('Default open');
    });

    it('defaults to closed when defaultOpen is not provided', function defaultClosed() {
      const result = renderToStringWithChildren({
        children: <div>Default closed</div>
      });

      assume(result).includes('Default closed');
    });
  });

  describe('Render props with state', function renderProps() {
    it('children render prop receives state from controlled open prop', function controlledOpen() {
      let capturedState: any;
      function renderChildren(args: any) {
        capturedState = args.state;
        return <div>Content</div>;
      }
      renderToStringWithChildren({
        open: true,
        children: renderChildren
      });

      assume(capturedState).is.a('object');
      assume(capturedState.open).equals(true);
    });

    it('children render prop receives state from defaultOpen', function uncontrolledDefaultOpen() {
      let capturedState: any;
      function renderChildren(args: any) {
        capturedState = args.state;
        return <div>Content</div>;
      }
      renderToStringWithChildren({
        defaultOpen: true,
        children: renderChildren
      });

      assume(capturedState).is.a('object');
      assume(capturedState.open).equals(true);
    });

    it('children render prop receives false state when defaultOpen is not provided', function uncontrolledDefaultClosed() {
      let capturedState: any;
      function renderChildren(args: any) {
        capturedState = args.state;
        return <div>Content</div>;
      }
      renderToStringWithChildren({
        children: renderChildren
      });

      assume(capturedState).is.a('object');
      assume(capturedState.open).equals(false);
    });

    it('type render prop receives state and is evaluated before React Aria hooks', function typeWithState() {
      let capturedState: any;
      function renderType(args: any) {
        capturedState = args.state;
        return args.state.open ? 'dialog' : 'menu';
      }
      renderToStringWithChildren({
        defaultOpen: true,
        type: renderType,
        children: <div>Content</div>
      });

      assume(capturedState).is.a('object');
      assume(capturedState.open).equals(true);
    });

    it('isDismissable render prop receives state and is evaluated before React Aria hooks', function isDismissableWithState() {
      let capturedState: any;
      function renderIsDismissable(args: any) {
        capturedState = args.state;
        return !args.state.open;
      }
      renderToStringWithChildren({
        defaultOpen: false,
        isDismissable: renderIsDismissable,
        children: <div>Content</div>
      });

      assume(capturedState).is.a('object');
      assume(capturedState.open).equals(false);
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
              it(`conditional export "${exported}.${key}" exists for ${pkg.name}/${subpaths}`, async function exportedTest() {
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
