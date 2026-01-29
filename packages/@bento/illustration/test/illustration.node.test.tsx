import { Illustration, type IllustrationProps } from '@bento/illustration';
import { RenderingSvg } from '../examples/rendering-svg.tsx';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the `Illustration` component to a string with the provided props.
 *
 * @param {Object} [args={}] - The props to pass to the `Illustration` component.
 * @returns {string} The rendered string representation of the `Illustration` component.
 * @private
 */
function renderToStringWithChildren(args: IllustrationProps) {
  return renderToString(<Illustration {...(args as any)} />);
}

/**
 * Renders the `RenderingSvg` component to a string with the provided arguments.
 *
 * @param {Object} [args={}] - The arguments to pass to the `RenderingSvg` component.
 * @returns {string} The rendered string representation of the `RenderingSvg` component.
 * @private
 */
function renderToStringWithIllustration(args = {}) {
  return renderToString(<RenderingSvg {...args} />);
}

describe('@bento/illustration', function bento() {
  it('introduces a viewBox to the SVG if not provided', function viewBox() {
    const markup = renderToStringWithChildren({
      height: 24,
      width: 28,
      x: 12,
      y: 13,
      children: <svg />
    });

    assume(markup).includes('viewBox="12 13 28 24"');
  });

  it('uses the SVG viewBox if provided', function providedViewBox() {
    const markup = renderToStringWithChildren({
      height: 24,
      width: 28,
      x: 12,
      y: 13,
      children: <svg viewBox="0 0 100 100" />
    });

    assume(markup).includes('viewBox="0 0 100 100"');
  });

  it('uses sane defaults for viewBox if no props are provided', function saneDefaults() {
    const markup = renderToStringWithChildren({ children: <svg /> });

    assume(markup).includes('viewBox="0 0 24 24"');
  });

  it('introduces the unkown props to the SVG element', function unknownProps() {
    const markup = renderToStringWithIllustration({
      preserveAspectRatio: 'xMidYMid meet',
      'data-foo': 'bar'
    });

    assume(markup).includes('data-foo="bar"');
    assume(markup).includes('preserveAspectRatio="xMidYMid meet"');
  });

  describe('data-attributes', function dataAttributesSuite() {
    it('renders no data-flip or data-rotate when no properties are used', function noDataAttributes() {
      const markup = renderToStringWithIllustration();

      assume(markup).does.not.include('data-flip');
      assume(markup).does.not.include('data-rotate');
    });

    it('renders data-flip when flip property is used', function dataFlip() {
      const markup = renderToStringWithIllustration({ flip: 'horizontal' });

      assume(markup).includes('data-flip="horizontal"');
    });

    it('renders data-rotate when rotate property is used', function dataRotate() {
      const markup = renderToStringWithIllustration({ rotate: 90 });

      assume(markup).includes('data-rotate="90"');
    });
  });

  describe('accessiblity', function accessiblitySuite() {
    it('renders as focusable=false role=presentation by default', function roleTest() {
      const markup = renderToStringWithIllustration();

      assume(markup).includes('role="presentation"');
      assume(markup).includes('focusable="false"');
      assume(markup).does.not.include('role="img"');
      assume(markup).does.not.include('aria-labelledby');
    });

    it('renders an illustration with a title', function titleTest() {
      const markup = renderToStringWithIllustration({ title: 'A test illustration' });

      assume(markup).includes('role="img"');
      assume(markup).includes('aria-labelledby=":R0:"');
      assume(markup).includes('<title id=":R0:">A test illustration</title>');
    });

    it('renders an illustration with aria-hidden if requested', function ariaHiddenTest() {
      const markup = renderToStringWithIllustration({ 'aria-hidden': true });
      assume(markup).includes('aria-hidden="true"');
    });

    it('can override the role property', function roleOverride() {
      const markup = renderToStringWithIllustration({ role: 'img', title: 'A test illustration' });

      assume(markup).includes('role="img"');
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
