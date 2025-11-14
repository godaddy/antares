import React, { ComponentProps } from 'react';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { CheckboxGroup, Checkbox } from '@bento/checkbox';
import { renderToString } from 'react-dom/server';
import { Text } from '@bento/text';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';

/**
 * Renders the `CheckboxGroup` and `Checkbox` components to a string with the provided props.
 *
 * @param {Object} [groupProps={}] - The props to pass to the `CheckboxGroup` component.
 * @param {Object} [checkboxProps={}] - The props to pass to the `Checkbox` component.
 * @returns {string} The rendered string representation of the `CheckboxGroup` and `Checkbox` components.
 * @private
 */
function renderToStringCheckbox(
  groupProps: Partial<ComponentProps<typeof CheckboxGroup>> = {},
  checkboxProps: Partial<ComponentProps<typeof Checkbox>> = {}
) {
  return renderToString(
    <CheckboxGroup name="options" className="random-class-group" {...groupProps}>
      <Text slot="label">Choose an option</Text>
      <Text slot="description">This is a description</Text>
      <Checkbox value="only-choice" className="random-class-checkbox" {...checkboxProps}>
        Only choice
      </Checkbox>
    </CheckboxGroup>
  );
}

describe('@bento/checkbox', function bento() {
  it('renders a basic Checkbox with the correct attributes', function correctAttributes() {
    const result = renderToStringCheckbox();

    assume(result).includes('role="group"');
    assume(result).match(/<label[^>]*>.*Only choice.*<\/label>/);
    assume(result).includes('"random-class-checkbox"');
    assume(result).includes('"random-class-group"');

    const checkbox = result.match(/<label[^>]*>.*Only choice.*<\/label>/)?.[0];
    assume(checkbox).includes('type="checkbox"');
    assume(checkbox).includes('"random-class-checkbox"');
    assume(checkbox).includes('value="only-choice"');
  });

  describe('#slots', function slots() {
    it('renders correct slot values', function correctSlotValues() {
      const result = renderToStringCheckbox(
        {
          slots: {
            label: { style: { color: 'yellow' } },
            description: { style: { color: 'blue' } }
          }
        },
        {
          slots: {
            'icon-checked': { style: { color: 'orange' } },
            'icon-unchecked': { style: { color: 'purple' } },
            'icon-indeterminate': { style: { color: 'pink' } }
          }
        }
      );

      // 3 slot styles can be present at once
      assume((result.match(/color:/g) || []).length).equals(3);
      assume(result).includes('color:yellow');
      assume(result).includes('color:blue');
      assume(result).includes('color:purple');
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
