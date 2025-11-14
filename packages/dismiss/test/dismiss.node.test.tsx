import { SlotCustomization } from '../examples/slot-customization.tsx';
import { Dismiss, type DismissProps } from '@bento/dismiss';
import { CustomLabel } from '../examples/custom-label.tsx';
import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { Basic } from '../examples/basic.tsx';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';
import fs from 'node:fs/promises';
import assume from 'assume';
import React from 'react';

/**
 * Renders the `Dismiss` component to a string with the provided props.
 *
 * @param {DismissProps} args - The props to pass to the `Dismiss` component.
 * @returns {string} The rendered string representation of the `Dismiss` component.
 * @private
 */
function renderToStringDismiss(args: DismissProps) {
  return renderToString(<Dismiss {...args} />);
}

describe('@bento/dismiss', function bento() {
  describe('Dismiss', function dismissTests() {
    it('renders a dismiss button with default props', function defaultProps() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        }
      });

      assume(result).includes('aria-label="Dismiss"');
      assume(result).includes('tabindex="-1"');
      assume(result).includes('type="button"');
      assume(result).includes('<button');
    });

    it('renders with custom aria-label', function customLabel() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        },
        ariaLabel: 'Close dialog'
      });

      assume(result).includes('aria-label="Close dialog"');
    });

    it('renders button inside VisuallyHidden wrapper', function visuallyHidden() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        }
      });

      // Check that the button is wrapped in a visually hidden element (with data-hidden attribute)
      assume(result).includes('data-hidden="true"');
      assume(result).includes('<button');
    });

    it('excludes onDismiss and ariaLabel from HTML attributes', function excludes() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        },
        ariaLabel: 'Close'
      });

      assume(result).doesnt.include(' onDismiss=');
      assume(result).doesnt.include(' ariaLabel=');
    });

    it('applies defensive width and height styles', function defensiveStyles() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        }
      });

      assume(result).includes('width:1');
      assume(result).includes('height:1');
    });

    it('renders with slot customization', function slotCustomization() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        },
        slots: {
          hidden: {
            className: 'custom-hidden'
          }
        }
      });

      assume(result).includes('class="custom-hidden');
    });

    it('renders without onDismiss callback', function noOnDismiss() {
      const result = renderToStringDismiss({});

      assume(result).includes('<button');
      assume(result).includes('aria-label="Dismiss"');
    });

    it('renders with children', function withChildren() {
      const result = renderToStringDismiss({
        onDismiss: function noop() {
          /* intentionally empty */
        },
        children: 'Close'
      });

      assume(result).includes('Close');
    });
  });

  describe('Examples', function examplesSuite() {
    it('renders basic example', function basicExample() {
      const result = renderToString(<Basic />);
      assume(result).is.a('string');
      assume(result).includes('Open Dialog');
    });

    it('renders custom label example', function customLabelExample() {
      const result = renderToString(<CustomLabel />);
      assume(result).is.a('string');
      assume(result).includes('Open Dialog');
    });

    it('renders slot customization example', function slotExample() {
      const result = renderToString(<SlotCustomization />);
      assume(result).is.a('string');
      assume(result).includes('Open Dialog');
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
