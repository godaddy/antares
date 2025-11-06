import { Select, type SelectProps } from '@bento/select';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { type AnyObject } from '@bento/types';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';
import { ListBoxItem } from '@bento/listbox';

/**
 * Renders the `Select` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Select` component.
 * @returns {string} The rendered string representation of the `Select` component.
 * @private
 */
function renderToStringSelect(args: SelectProps & { slots?: AnyObject }) {
  return renderToString(
    <Select {...args} aria-label="Test select">
      <ListBoxItem id="test" textValue="Test">
        Test
      </ListBoxItem>
    </Select>
  );
}

describe('@bento/select', function bento() {
  it('renders a select with the correct props', function select() {
    const result = renderToStringSelect({
      placeholder: 'Select an option'
    });

    assume(result).includes('Select an option');
    assume(result).includes('role="button"');
  });

  describe('#slots', function slots() {
    it('renders correct [data-override] attribute values', function overrides() {
      const result = renderToStringSelect({
        className: 'custom-class',
        style: { color: 'red' },
        placeholder: 'Select'
      });

      assume(result).includes('data-override="className style"');
    });

    it('introduced the `select` slot to the Select component', function selectSlot() {
      const result = renderToStringSelect({
        placeholder: 'Select',
        slots: {
          select: {
            'data-foo': 'bar'
          }
        }
      });

      assume(result).includes('data-override="slot"');
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
