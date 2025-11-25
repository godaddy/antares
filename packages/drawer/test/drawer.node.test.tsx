import { Drawer, type DrawerProps } from '@bento/drawer';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { type AnyObject } from '@bento/types';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the `Drawer` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Drawer` component.
 * @returns {string} The rendered string representation of the `Drawer` component.
 * @private
 */
function renderToStringDrawer(args: DrawerProps & { slots?: AnyObject }) {
  const { children = 'Content', ...rest } = args;
  return renderToString(<Drawer {...rest}>{children}</Drawer>);
}

describe('@bento/drawer', function bento() {
  it('renders a drawer with the correct props', function drawer() {
    const result = renderToStringDrawer({
      open: true,
      role: 'region',
      children: 'Drawer content'
    });

    assume(result).includes('aria-expanded="true"');
    assume(result).includes('role="region"');
    assume(result).includes('Drawer content');
  });

  it('renders with aria-expanded="false" when closed', function collapsed() {
    const result = renderToStringDrawer({
      open: false,
      children: 'Drawer content'
    });

    assume(result).includes('aria-expanded="false"');
  });

  it('renders with custom role', function customRole() {
    const result = renderToStringDrawer({
      open: true,
      role: 'dialog',
      children: 'Drawer content'
    });

    assume(result).includes('role="dialog"');
  });

  it('applies user styles', function userStyles() {
    const result = renderToStringDrawer({
      open: true,
      style: { backgroundColor: 'blue' },
      children: 'Drawer content'
    });

    assume(result).includes('background-color:blue');
  });

  describe('#slots', function slots() {
    it('renders correct [data-override] attribute values', function overrides() {
      const result = renderToStringDrawer({
        className: 'custom-class',
        style: { color: 'red' },
        open: true,
        children: <div>Drawer content</div>
      });

      assume(result).includes('data-override="className style"');
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
