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

  it('applies data-invalid and aria-invalid when aria-invalid is true', function invalidTrue() {
    const result = renderToStringInput({ 'aria-invalid': true });
    assume(result).to.contain('data-invalid="true"');
    assume(result).to.contain('aria-invalid="true"');
  });

  it('does not apply data-invalid when aria-invalid is false', function invalidFalse() {
    const result = renderToStringInput({ 'aria-invalid': false });
    assume(result).not.to.contain('data-invalid="true"');
    assume(result).to.contain('aria-invalid="false"');
  });

  it('applies data-disabled and disabled when disabled is true', function disabledTrue() {
    const result = renderToStringInput({ disabled: true });
    assume(result).to.contain('data-disabled="true"');
    assume(result).to.contain('disabled');
  });

  it('does not apply data-disabled when disabled is false', function disabledFalse() {
    const result = renderToStringInput({ disabled: false });
    assume(result).not.to.contain('data-disabled="true"');
  });

  it('applies data-required and required when required is true', function requiredTrue() {
    const result = renderToStringInput({ required: true });
    assume(result).to.contain('data-required="true"');
    assume(result).to.contain('required');
  });

  it('does not apply data-required when required is false', function requiredFalse() {
    const result = renderToStringInput({ required: false });
    assume(result).not.to.contain('data-required="true"');
    assume(result).not.to.contain('required');
  });

  it('applies data-empty when value is empty string', function emptyString() {
    const result = renderToStringInput({ value: '' });
    assume(result).to.contain('data-empty="true"');
  });

  it('applies data-empty when value is undefined', function emptyUndefined() {
    const result = renderToStringInput({ value: undefined });
    assume(result).to.contain('data-empty="true"');
  });

  it('applies data-empty when value is not provided', function emptyDefault() {
    const result = renderToStringInput();
    assume(result).to.contain('data-empty="true"');
  });

  it('does not apply data-empty when value is non-empty', function notEmpty() {
    const result = renderToStringInput({ value: 'foo' });
    assume(result).not.to.contain('data-empty="true"');
  });

  it('applies checked attribute for checkbox when checked is true', function checkedCheckboxTrue() {
    const result = renderToString(<Input type="checkbox" checked={true} />);
    assume(result).to.contain('type="checkbox"');
    assume(result).to.contain('checked');
  });

  it('does not apply checked attribute for checkbox when checked is false', function checkedCheckboxFalse() {
    const result = renderToString(<Input type="checkbox" checked={false} />);
    assume(result).to.contain('type="checkbox"');
    assume(result).not.to.contain('checked');
  });

  it('applies checked attribute for radio when checked is true', function checkedRadioTrue() {
    const result = renderToString(<Input type="radio" checked={true} />);
    assume(result).to.contain('type="radio"');
    assume(result).to.contain('checked');
  });

  it('does not apply checked attribute for radio when checked is false', function checkedRadioFalse() {
    const result = renderToString(<Input type="radio" checked={false} />);
    assume(result).to.contain('type="radio"');
    assume(result).not.to.contain('checked');
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
