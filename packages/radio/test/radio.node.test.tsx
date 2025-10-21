import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Radio, RadioGroup } from '@bento/radio';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import React, { ComponentProps } from 'react';
import { SingleRadioExample } from '../examples/single-radio';

/**
 * Renders the `RadioGroup` and `Radio` components to a string with the provided props.
 *
 * @param {Object} [groupProps={}] - The props to pass to the `RadioGroup` component.
 * @param {Object} [radioProps={}] - The props to pass to the `Radio` component.
 * @returns {string} The rendered string representation of the `RadioGroup` and `Radio` components.
 * @private
 */
function renderToStringRadioGroup(
  groupProps: Partial<ComponentProps<typeof RadioGroup>> = {},
  radioProps: Partial<ComponentProps<typeof Radio>> = {}
) {
  return renderToString(<SingleRadioExample groupProps={groupProps} radioProps={radioProps} />);
}

describe('@bento/radio', function bento() {
  it('renders a RadioGroup and Radio with the correct attributes', function correctAttributes() {
    const result = renderToStringRadioGroup();

    assume(result).includes('role="radiogroup"');
    assume(result).match(/<label[^>]*>.*Apple.*<\/label>/);

    const inputMatch = result.match(/<input\b[^>]*>/)?.[0];
    assume(inputMatch).includes('type="radio"');
    assume(inputMatch).includes('name="fruit"');
    assume(inputMatch).includes('value="apple"');
  });

  describe('#slots', function slots() {
    it('renders correct slot values', function correctSlotValues() {
      renderToStringRadioGroup();
      const result = renderToStringRadioGroup(
        {
          description: 'This is a description',
          slots: {
            'group.label': { style: { color: 'yellow' } },
            'group.description': { style: { color: 'blue' } }
          }
        },
        {
          slots: {
            'control.icon-unchecked': { style: { color: 'red' } }
          }
        }
      );

      assume((result.match(/color:/g) || []).length).equals(3);
      assume(result).includes('color:yellow');
      assume(result).includes('color:blue');
      assume(result).includes('color:red');
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
