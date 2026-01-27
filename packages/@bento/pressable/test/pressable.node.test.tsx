import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Pressable, type PressableProps } from '@bento/pressable';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the `Pressable` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Pressable` component.
 * @returns {string} The rendered string representation of the `Pressable` component.
 * @private
 */
function renderToStringPressable(args: PressableProps) {
  return renderToString(<Pressable {...args} />);
}

describe('@bento/pressable', function bento() {
  it('renders a pressable div with the correct props', function pressable() {
    const result = renderToStringPressable({
      children: <div>Press me</div>
    });

    assume(result).includes('data-react-aria-pressable="true"');
    assume(result).match(/^<div[^>]*>Press me<\/div>$/);
  });

  describe('#slots', function slots() {
    it('renders correct [data-override] attribute values', function overrides() {
      const result = renderToStringPressable({
        className: 'custom-class',
        style: { color: 'red' },
        children: <div>Press me</div>,
        onClick: () => void 0,
        onPress: () => void 0,
        onPressStart: () => void 0,
        onPressEnd: () => void 0,
        onPressUp: () => void 0,
        onPressChange: () => void 0
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
