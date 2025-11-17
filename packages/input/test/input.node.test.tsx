import React, { ComponentProps } from 'react';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Input } from '@bento/input';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import assume from 'assume';
import fs from 'node:fs/promises';

/**
 * Renders the `Input` component to a string with the provided props.
 *
 * @param {Object} [inputProps={}] - The props to pass to the `Input` component.
 * @returns {string} The rendered string representation of the `Input` component.
 * @private
 */
function renderToStringInput(inputProps: Partial<ComponentProps<typeof Input>> = {}) {
  return renderToString(<Input type="text" className="random-class-input" {...inputProps} />);
}

describe('@bento/input', function bento() {
  it('renders a basic Input with the correct attributes', function correctAttributes() {
    const result = renderToStringInput();
    assume(result).to.contain('<input');
    assume(result).to.contain('type="text"');
    assume(result).to.contain('class="random-class-input"');
  });

  describe('#slots', function slots() {
    it('renders correct slot values', function correctSlotValues() {
      const result = renderToStringInput();
      assume(result).to.contain('<input');
      assume(result).to.contain('type="text"');
      assume(result).to.contain('class="random-class-input"');
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
