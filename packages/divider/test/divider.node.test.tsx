import React from 'react';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Divider, type DividerProps } from '@bento/divider';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';

/**
 * Renders the `Divider` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Divider` component.
 * @returns {string} The rendered string representation of the `Divider` component.
 * @private
 */
function renderToStringDivider(args: DividerProps | null) {
  return renderToString(<Divider {...args} />);
}

describe('@bento/divider', function bento() {
  it('renders a divider with the correct props', function divider() {
    const result = renderToStringDivider(null);

    assume(result).includes('aria-orientation="horizontal"');
    assume(result).doesnt.include('data-override');
    assume(result).startsWith('<hr');
    assume(result).endsWith('/>');
  });

  it('renders with vertical orientation', function () {
    const result = renderToStringDivider({
      orientation: 'vertical'
    });

    assume(result).includes('aria-orientation="vertical"');
  });

  it('excludes orientation prop from HTML attributes', function () {
    const result = renderToStringDivider({
      orientation: 'vertical'
    });

    assume(result).includes('aria-orientation="vertical"');
    assume(result).doesnt.include(' orientation=');
  });

  it('renders correct [data-override] attribute values when directly overridden', function () {
    const result = renderToStringDivider({
      className: 'custom-class',
      style: { color: 'red' }
    });

    assume(result).includes('data-override="className style"');
  });

  it('allows user to override classname fully', function () {
    const result = renderToStringDivider({
      className: 'custom-class'
    });

    assume(result).includes('class="custom-class"');
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
