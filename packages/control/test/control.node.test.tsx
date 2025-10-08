import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Control, ControlGroup } from '@bento/control';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import { DefaultExample } from '../examples/default';
import fs from 'node:fs/promises';
import assume from 'assume';
import React, { ComponentProps } from 'react';

/**
 * Renders the `ControlGroup` and `Control` components to a string with the provided props.
 *
 * @param {Object} [groupProps={}] - The props to pass to the `ControlGroup` component.
 * @param {Object} [controlProps={}] - The props to pass to the `Control` component.
 * @returns {string} The rendered string representation of the `ControlGroup` and `Control` components.
 * @private
 */
function renderToStringControlGroup(
  groupProps: Partial<ComponentProps<typeof ControlGroup>> = {},
  controlProps: Partial<ComponentProps<typeof Control>> = {}
) {
  return renderToString(<DefaultExample groupProps={groupProps} controlProps={controlProps} />);
}

describe('@bento/control', function bento() {
  it('renders a ControlGroup and Control with the correct attributes', function correctAttributes() {
    const result = renderToStringControlGroup();

    assume(result).includes('"random-class-control"');
    assume(result).includes('"random-class-group"');

    const inputMatch = result.match(/<input\b[^>]*>/)?.[0];
    assume(result).includes('Control label');
    assume(result).includes('Control description');
    assume(result).includes('Control error message');
    assume(inputMatch).does.not.equal(null);
  });

  describe('#slots', function slots() {
    it('renders correct slot values', function correctSlotValues() {
      const result = renderToStringControlGroup(
        {
          slots: {
            label: { style: { color: 'yellow' } },
            description: { style: { color: 'blue' } },
            error: { style: { color: 'red' } }
          }
        },
        {
          slots: {
            label: { title: 'control label' }
          }
        }
      );

      assume((result.match(/color:/g) || []).length).equals(5);
      assume(result).includes('color:yellow');
      assume(result).includes('color:blue');
      assume(result).includes('color:red');
      assume(result).includes('title="control label"');
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
