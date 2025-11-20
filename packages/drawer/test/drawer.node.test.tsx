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
      isExpanded: true,
      role: 'region',
      children: 'Drawer content'
    });

    assume(result).includes('data-is-expanded="true"');
    assume(result).includes('role="region"');
    assume(result).includes('Drawer content');
  });

  it('renders without data-is-expanded when collapsed', function collapsed() {
    const result = renderToStringDrawer({
      isExpanded: false,
      children: 'Drawer content'
    });

    assume(result).does.not.include('data-is-expanded');
  });

  it('renders with custom role', function customRole() {
    const result = renderToStringDrawer({
      isExpanded: true,
      role: 'dialog',
      children: 'Drawer content'
    });

    assume(result).includes('role="dialog"');
  });

  it('renders with top placement', function topPlacement() {
    const result = renderToStringDrawer({
      isExpanded: true,
      placement: 'top',
      children: 'Drawer content'
    });

    assume(result).includes('data-placement="top"');
  });

  it('renders with right placement', function rightPlacement() {
    const result = renderToStringDrawer({
      isExpanded: true,
      placement: 'right',
      children: 'Drawer content'
    });

    assume(result).includes('data-placement="right"');
  });

  it('renders with end placement', function endPlacement() {
    const result = renderToStringDrawer({
      isExpanded: true,
      placement: 'end',
      children: 'Drawer content'
    });

    assume(result).includes('data-placement="end"');
  });

  it('renders with animate disabled', function animateDisabled() {
    const result = renderToStringDrawer({
      isExpanded: true,
      animate: false,
      children: 'Drawer content'
    });

    assume(result).does.not.include('transition');
    assume(result).does.not.include('will-change');
  });

  it('renders with custom animate string', function customAnimate() {
    const result = renderToStringDrawer({
      isExpanded: true,
      animate: '0.5s ease-out',
      children: 'Drawer content'
    });

    assume(result).includes('transition:all 0.5s ease-out');
  });

  it('applies user styles', function userStyles() {
    const result = renderToStringDrawer({
      isExpanded: true,
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
        isExpanded: true,
        children: <div>Drawer content</div>
      });

      assume(result).includes('data-override="className style"');
    });

    it('introduced the `drawer` slot to the Container component', function drawerSlot() {
      const result = renderToStringDrawer({
        isExpanded: true,
        children: <div>Drawer content</div>,
        slots: {
          drawer: {
            'data-foo': 'bar'
          }
        }
      });

      assume(result).includes('data-override="style slot"');
      assume(result).includes('data-foo="bar"');
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
