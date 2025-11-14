import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
import { renderToString } from 'react-dom/server';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import { type AnyObject } from '@bento/types';
import React from 'react';

/**
 * Renders the `Text` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Text` component.
 * @returns {string} The rendered string representation of the `Text` component.
 * @private
 */
function renderToStringHeading(args: HeadingProps & { slots?: AnyObject }) {
  return renderToString(<Heading {...args} />);
}

describe('@bento/heading', function bento() {
  it('does not render when no children are provided', function noChildren() {
    const result = renderToStringHeading({});
    assume(result).match(/^$/);
  });

  it('renders a heading with default tag', function defaultTag() {
    const result = renderToStringHeading({
      children: 'Handgloves'
    });

    assume(result).match(/^<span[^>]*>Handgloves<\/span>$/);
  });

  it('inherits from @bento/text', function inheritFromText() {
    const result = renderToStringHeading({
      children: 'Handgloves',
      wrap: 'balance'
    });

    assume(result).includes('--wrap:balance');
  });

  it('renders a heading with tag related to level', function customTag() {
    const result = renderToStringHeading({
      children: 'Handgloves',
      level: 1
    });

    assume(result).match(/^<h1[^>]*>Handgloves<\/h1>$/);
  });

  it('renders as span when level is not a number', function invalidLevel() {
    const result = renderToStringHeading({
      children: 'Handgloves',
      // @ts-expect-error - Testing runtime behavior with invalid level type
      level: 'invalid'
    });

    assume(result).match(/^<span[^>]*>Handgloves<\/span>$/);
  });

  describe('Public API', function packageSuite() {
    it('has HeadingProvider attached', function hasProvider() {
      assume(HeadingProvider).to.be.an('object');
    });

    it('automatically determines heading levels with Provider nesting', function autoLevels() {
      const result = renderToString(
        <HeadingProvider>
          <Heading>Level 1</Heading>
          <HeadingProvider>
            <Heading>Level 2</Heading>
            <HeadingProvider>
              <Heading>Level 3</Heading>
            </HeadingProvider>
          </HeadingProvider>
        </HeadingProvider>
      );

      assume(result).includes('<h1');
      assume(result).includes('<h2');
      assume(result).includes('<h3');
    });

    it('HeadingProvider with level prop still uses context', function providerWithLevel() {
      const result = renderToString(
        <HeadingProvider level={5}>
          <Heading>Level should be 1</Heading>
        </HeadingProvider>
      );

      assume(result).includes('<h1');
    });

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
