import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { Icon, ondemand, set } from '@bento/icon';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
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
function renderToStringWithChildren(args = {}) {
  // @ts-expect-error - icon is required
  return renderToString(<Icon {...args} />);
}

describe('@bento/icon', function bento() {
  beforeEach(function before() {
    set({
      play: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 22v-20l18 10-18 10z" />
        </svg>
      )
    });
  });

  it('exposes the relevant store methods', function store() {
    assume(ondemand).is.a('function');
    assume(set).is.a('function');
  });

  it('throws an error when no icon name is provided', function noIconName() {
    assume(renderToStringWithChildren).throws();
  });

  it('does not not try to call the ondemand function when no icon name is provided', function noIconName() {
    const undemand = ondemand(function neverCall() {
      throw new Error('i should never be called');
    });

    assume(renderToStringWithChildren).throws();
    undemand();
  });

  it('renders the icon when a valid icon name exists in the store', function validIconName() {
    const result = renderToStringWithChildren({ icon: 'play' });

    assume(result).is.a('string');
    assume(result).includes('data-icon="play"');
    assume(result).includes('<path d="M3 22v-20l18 10-18 10z">');
    assume(result).includes('viewBox="0 0 24 24"');
    assume(result).includes('xmlns="http://www.w3.org/2000/svg"');
    assume(result).includes('role="presentation"');
    assume(result).includes('focusable="false"');
  });

  it('renders a use tag when valid icon name exists in the store but mode is set to sprite', function spriteMode() {
    const result = renderToStringWithChildren({ icon: 'play', mode: 'sprite' });

    assume(result).includes('data-icon="play"');
    assume(result).includes('role="presentation"');
    assume(result).includes('focusable="false"');
    assume(result).includes('viewBox="0 0 24 24"');
    assume(result).includes('<use xlink:href="#bento-svg-spritesheet-play" fill="currentColor"></use>');
  });

  it('renders the icon with the correct width and height', function widthHeight() {
    const result = renderToStringWithChildren({ icon: 'play', width: 32, height: 69 });

    assume(result).includes('width="32"');
    assume(result).includes('height="69"');
  });

  it('renders the icon with the correct fill color', function fill() {
    const result = renderToStringWithChildren({ icon: 'play', fill: 'red' });

    assume(result).includes('fill="red"');
  });

  it('renders the icon with the correct flip', function flip() {
    const result = renderToStringWithChildren({ icon: 'play', flip: 'horizontal' });

    assume(result).includes('data-flip="horizontal"');
    assume(result).includes('<g transform="translate(24 0) scale(-1 1)">');
  });

  describe('#loading', function loading() {
    it('does not render the children when the icon is not loading', function notLoading() {
      const result = renderToStringWithChildren({ icon: 'unknown' });

      assume(result).equals('');
    });

    it('passes the loading state to the renderProps function', function loadingState() {
      const result = renderToStringWithChildren({
        icon: 'unknown',
        children: function renderChildren(args) {
          assume(args).is.a('object');
          assume(args.state).is.a('object');
          assume(args.original).is.a('undefined');
          assume(args.props).is.a('object');
          assume(args.props.icon).equals('unknown');

          return (
            <svg>
              <text>renderProps</text>
            </svg>
          );
        }
      });

      assume(result).includes('<text>renderProps</text></svg>');
    });

    it('renders the children when the icon is loading', function loading() {
      const result = renderToStringWithChildren({
        icon: 'unknown',
        children: (
          <svg>
            <text>loading</text>
          </svg>
        )
      });

      assume(result).includes('<text>loading</text></svg>');
    });
  });

  describe('#data-attributes', function dataProps() {
    it('introduces the data-icon attribute to the rendered icon', function named() {
      const result = renderToStringWithChildren({ icon: 'play' });

      assume(result).includes('data-icon="play"');
    });

    it('assigns the data-loading attribute when the icon is loading', function loading() {
      const result = renderToStringWithChildren({
        icon: 'unknown',
        children: (
          <svg>
            <text>loading</text>
          </svg>
        )
      });

      assume(result).includes('data-loading="true"');
    });

    it('does not assign the data-loading attribute when the icon is not loading', function notLoading() {
      const result = renderToStringWithChildren({ icon: 'play' });

      assume(result).does.not.include('data-loading="true"');
      assume(result).does.not.include('data-loading="false"');
    });
  });

  describe('#slots', function slots() {
    it('introduced the `content` slot to the Illustration component', function content() {
      const result = renderToStringWithChildren({
        icon: 'play',
        slots: {
          content: {
            'data-foo': 'bar'
          }
        }
      });

      assume(result).includes('role="presentation"');
      assume(result).includes('focusable="false"');
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
