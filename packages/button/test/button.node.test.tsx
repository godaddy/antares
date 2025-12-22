import { Button, type ButtonProps } from '@bento/button';
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
 * Renders the `Button` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Button` component.
 * @returns {string} The rendered string representation of the `Button` component.
 * @private
 */
function renderToStringButton(args: ButtonProps & { slots?: AnyObject }) {
  return renderToString(<Button {...args} />);
}

describe('@bento/button', function bento() {
  it('renders a button with the correct props', function button() {
    const result = renderToStringButton({
      children: 'Click me'
    });

    assume(result).includes('type="button"');
    assume(result).match(/^<button[^>]*>Click me<\/button>$/);
  });

  describe('#slots', function slots() {
    it('introduced the `pressable` slot to the Pressable component', function pressable() {
      const result = renderToStringButton({
        children: <div>Press me</div>,
        slots: {
          pressable: {
            'data-foo': 'bar'
          }
        }
      });

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
