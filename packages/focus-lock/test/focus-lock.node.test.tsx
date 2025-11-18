import pkg from '../package.json' with { type: 'json' };
import { FocusLock } from '@bento/focus-lock';
import { BasicExample } from '../examples/basic';
import { FormExample } from '../examples/form';
import { SelectExample } from '../examples/select';
import { NestedExample } from '../examples/nested';
import { OverlayExample } from '../examples/overlay';
import { Container } from '@bento/container';
import { Button } from '@bento/button';
import { renderToString } from 'react-dom/server';
import { dirname, resolve, join } from 'node:path';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

describe('@bento/focus-lock', function bento() {
  describe('FocusLock SSR', function focusLockSSR() {
    it('renders basic example to string', function basicExample() {
      const html = renderToString(<BasicExample />);

      assume(html).is.a('string');
      assume(html).includes('data-testid="open-button"');
      assume(html).includes('Open Modal');
    });

    it('renders form example to string', function formExample() {
      const html = renderToString(<FormExample />);

      assume(html).is.a('string');
      assume(html).includes('Account Type');
      assume(html).includes('data-testid="step-0"');
      assume(html).includes('data-focus-contained="true"');
    });

    it('renders select example to string', function selectExample() {
      const html = renderToString(<SelectExample />);

      assume(html).is.a('string');
      assume(html).includes('Select an option...');
    });

    it('renders nested example to string', function nestedExample() {
      const html = renderToString(<NestedExample />);

      assume(html).is.a('string');
      assume(html).includes('data-testid="open-outer-button"');
      assume(html).includes('Open Outer Modal');
    });

    it('renders overlay example to string', function overlayExample() {
      const html = renderToString(<OverlayExample />);

      assume(html).is.a('string');
      assume(html).includes('data-testid="open-overlay-button"');
      assume(html).includes('Open Overlay');
    });

    it('renders with contain prop and applies data-focus-contained attribute', function containProp() {
      const html = renderToString(
        <FocusLock contain>
          <Container data-testid="focus-content">Content</Container>
        </FocusLock>
      );

      assume(html).includes('data-testid="focus-content"');
      assume(html).includes('data-focus-contained="true"');
    });

    it('renders without contain prop', function noContainProp() {
      const html = renderToString(
        <FocusLock>
          <Container data-testid="focus-content">Content</Container>
        </FocusLock>
      );

      assume(html).includes('data-testid="focus-content"');
      assume(html).includes('Content');
    });

    it('applies data-focus-contained attribute during SSR', function dataAttributes() {
      const html = renderToString(
        <FocusLock contain>
          <Container data-testid="focus-content">Content</Container>
        </FocusLock>
      );

      assume(html).includes('data-focus-contained="true"');
    });

    it('renders multiple children with data attributes', function multipleChildren() {
      const html = renderToString(
        <FocusLock contain>
          <Container data-testid="first">First</Container>
          <Container data-testid="second">Second</Container>
        </FocusLock>
      );

      assume(html).includes('data-testid="first"');
      assume(html).includes('data-testid="second"');
      assume(html).includes('data-focus-contained="true"');
    });

    it('returns empty string when children is null', function nullChildren() {
      const html = renderToString(<FocusLock>{null}</FocusLock>);

      assume(html).equals('');
    });

    it('returns empty string when children is undefined', function undefinedChildren() {
      const html = renderToString(<FocusLock>{undefined}</FocusLock>);

      assume(html).equals('');
    });

    it('returns empty string when no children provided', function noChildren() {
      const html = renderToString(<FocusLock />);

      assume(html).equals('');
    });

    it('renders with restoreFocus prop without errors', function restoreFocusProp() {
      const html = renderToString(
        <FocusLock restoreFocus>
          <Button>Click me</Button>
        </FocusLock>
      );

      assume(html).is.a('string');
      assume(html).includes('Click me');
    });

    it('renders with autoFocus prop without errors', function autoFocusProp() {
      const html = renderToString(
        <FocusLock autoFocus>
          <Button>Click me</Button>
        </FocusLock>
      );

      assume(html).is.a('string');
      assume(html).includes('Click me');
    });

    it('renders with all props combined', function allProps() {
      const html = renderToString(
        <FocusLock contain restoreFocus autoFocus>
          <Container>Modal content</Container>
        </FocusLock>
      );

      assume(html).includes('Modal content');
      assume(html).includes('data-focus-contained="true"');
    });

    it('handles text nodes as children', function textNodes() {
      const html = renderToString(
        <FocusLock contain>
          <Container>Content</Container>
          Plain text
        </FocusLock>
      );

      assume(html).includes('Content');
      assume(html).includes('Plain text');
      assume(html).includes('data-focus-contained="true"');
    });

    it('renders without onFocusEnter/onFocusLeave callbacks in SSR', function callbackProps() {
      const html = renderToString(
        <FocusLock
          onFocusEnter={function noop() {
            /* intentionally empty */
          }}
          onFocusLeave={function noop() {
            /* intentionally empty */
          }}
        >
          <Button>Button</Button>
        </FocusLock>
      );

      assume(html).is.a('string');
      assume(html).includes('Button');
    });

    it('renders with className render prop', function classNameRenderProp() {
      const html = renderToString(
        <FocusLock
          contain
          className={({ hasFocus, isContained }) =>
            `focus-lock ${isContained ? 'contained' : ''} ${hasFocus ? 'focused' : ''}`
          }
        >
          <Container data-slot="content">Content</Container>
        </FocusLock>
      );

      assume(html).includes('Content');
      assume(html).includes('data-focus-contained="true"');
    });

    it('renders with style render prop', function styleRenderProp() {
      const html = renderToString(
        <FocusLock
          contain
          style={({ hasFocus }) => ({
            opacity: hasFocus ? 1 : 0.5
          })}
        >
          <Container data-slot="content">Content</Container>
        </FocusLock>
      );

      assume(html).includes('Content');
      assume(html).includes('data-focus-contained="true"');
    });
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    it('exports FocusLock component', function exportsFocusLock() {
      assume(FocusLock).is.a('object');
      assume(FocusLock.$$typeof).equals(Symbol.for('react.memo'));
    });

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
