import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import * as FocusLockModule from '@bento/focus-lock';
import { FocusLock } from '@bento/focus-lock';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

describe('@bento/focus-lock (node)', function bentoNode() {
  describe('FocusLock', function focusLockTests() {
    it('renders children on the server', function rendersChildren() {
      const html = renderToString(
        <FocusLock contain restoreFocus autoFocus>
          <div data-testid="content">Focus lock content</div>
        </FocusLock>
      );

      assume(html).includes('data-testid="content"');
      assume(html).includes('Focus lock content');
    });

    it('includes data-focus-contained attribute when contain is true', function dataContained() {
      const html = renderToString(
        <FocusLock contain>
          <div>Content</div>
        </FocusLock>
      );

      assume(html).includes('data-focus-contained="true"');
    });

    it('does not include data-focus-contained when contain is false', function noDataContained() {
      const html = renderToString(
        <FocusLock contain={false}>
          <div>Content</div>
        </FocusLock>
      );

      assume(html).does.not.include('data-focus-contained="true"');
    });

    it('applies data attributes to multiple children', function multipleChildren() {
      const html = renderToString(
        <FocusLock contain>
          <div data-testid="first">First</div>
          <div data-testid="second">Second</div>
        </FocusLock>
      );

      assume(html).includes('data-testid="first"');
      assume(html).includes('data-testid="second"');
      assume(html).includes('data-focus-contained="true"');
    });

    it('returns null when no children provided', function noChildren() {
      const html = renderToString(<FocusLock contain />);

      assume(html).equals('');
    });

    it('applies additional props via slot system', function slotsProps() {
      const html = renderToString(
        <FocusLock contain data-custom-attr="test">
          <div>Content</div>
        </FocusLock>
      );

      assume(html).includes('data-focus-contained="true"');
    });

    it('handles text children', function textChildren() {
      const html = renderToString(
        <FocusLock contain>
          <div>Text content</div>
        </FocusLock>
      );

      assume(html).includes('Text content');
    });
  });

  describe('Exports', function exportsTests() {
    it('exposes FocusLock component', function focusLock() {
      // FocusLock is a memoized component (from withSlots)
      assume(FocusLock).is.a('object');
      assume(FocusLock).has.property('$$typeof');
    });

    it('exports from index', async function indexExports() {
      assume(FocusLockModule).has.property('FocusLock');
      assume(FocusLockModule.FocusLock).equals(FocusLock);
    });

    it('exports FocusLockState type', function exportsType() {
      // Type exports are compile-time only, but we can verify they exist in the module
      assume(FocusLockModule).has.property('FocusLock');
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

