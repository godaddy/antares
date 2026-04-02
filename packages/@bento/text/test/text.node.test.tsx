import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Text, type TextProps } from '@bento/text';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import { type AnyObject } from '@bento/types';

/**
 * Renders the `Text` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Text` component.
 * @returns {string} The rendered string representation of the `Text` component.
 * @private
 */
function renderToStringText(args: TextProps & { slots?: AnyObject }) {
  return renderToString(<Text {...args} />);
}

describe('@bento/text', function bento() {
  it('does not render when no children are provided', function noChildren() {
    const result = renderToStringText({});
    assume(result).match(/^$/);
  });

  it('renders a text with default tag', function defaultTag() {
    const result = renderToStringText({
      children: 'Handgloves'
    });

    assume(result).match(/^<span[^>]*>Handgloves<\/span>$/);
  });

  it('renders a text with custom tag', function customTag() {
    const result = renderToStringText({
      children: 'Handgloves',
      as: 'marquee'
    });

    assume(result).match(/^<marquee[^>]*>Handgloves<\/marquee>$/);
  });

  it('includes hashed classname', function hashedClassname() {
    const result = renderToStringText({
      children: 'Handgloves'
    });

    assume(result).includes('class="text');
  });

  it('renders with align prop', function alignProp() {
    const result = renderToStringText({
      children: 'Handgloves',
      align: 'center'
    });

    assume(result).includes('--align:center');
  });

  it('renders with maxLines prop', function maxLinesProp() {
    const result = renderToStringText({
      children: 'Handgloves',
      maxLines: 2
    });

    assume(result).includes('--max-lines:2');
  });

  it('renders with wrap prop', function wrapProp() {
    const result = renderToStringText({
      children: 'Handgloves',
      wrap: 'pretty'
    });

    assume(result).includes('--wrap:pretty');
  });

  describe('#slots', function slots() {
    it('renders correct [data-override] attribute values', function dataOverride() {
      const result = renderToStringText({
        className: 'custom-class',
        style: { color: 'red' },
        children: 'Handgloves'
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
