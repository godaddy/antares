import assume from 'assume';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';
import { resetPointer } from '#test/utils/test-helpers.tsx';
import { ComposedLegendHeaderExample } from '../examples/composed-legend-header';
import { ComposedTitleFooterExample } from '../examples/composed-title-footer';
import { CustomBucketsExample } from '../examples/custom-buckets';
import { DefaultExample } from '../examples/default';
import { Hourly24Example } from '../examples/hourly-24';
import { ScrollingExample } from '../examples/scrolling';
import { SingleRowExample } from '../examples/single-row';
import { WrapContentExample } from '../examples/wrap-content';

/** Viewport widths the chart is checked at: a phone, a tablet and a desktop. */
const WIDTHS = [
  ['mobile', 375],
  ['tablet', 768],
  ['desktop', 1280]
] as const;

/**
 * Renders an example in a container of the given width and waits for the chart SVG.
 *
 * @param children - Example element(s) to render
 * @param width - Viewport and container width in px
 * @returns Render result once the SVG is present and the layout has settled
 */
async function renderExampleAndWait(children: ReactNode, width = 800) {
  await page.viewport(width, 900);
  const result = await render(<div style={{ width: `${width}px` }}>{children}</div>);
  await waitForSelector(result.container, 'svg');
  // Margins are measured after mount (resize debounce plus a frame), so wait for the layout to settle.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return result;
}

describe('@godaddy/antares', function antares() {
  beforeEach(resetPointer);

  describe('#HeatmapChart', function heatmapChartTests() {
    describe('#examples', function examples() {
      it('default screenshot', async function defaultExample() {
        const { container } = await renderExampleAndWait(<DefaultExample />);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('default');
      });

      it('wrap-content screenshot', async function wrapContent() {
        const { container } = await renderExampleAndWait(<WrapContentExample />);

        await expect(container).toMatchScreenshot('wrap-content');
      });

      it('scrolling screenshot', async function scrolling() {
        const { container } = await renderExampleAndWait(<ScrollingExample />);

        await expect(container).toMatchScreenshot('scrolling');
      });

      it('single-row screenshot', async function singleRow() {
        const { container } = await renderExampleAndWait(<SingleRowExample />);

        await expect(container).toMatchScreenshot('single-row');
      });

      it('custom-buckets screenshot', async function customBuckets() {
        const { container } = await renderExampleAndWait(<CustomBucketsExample />);

        await expect(container).toMatchScreenshot('custom-buckets');
      });

      it('hourly-24 screenshot', async function hourly24() {
        const { container } = await renderExampleAndWait(<Hourly24Example />);

        await expect(container).toMatchScreenshot('hourly-24');
      });
    });

    describe('#composition', function composition() {
      for (const [name, width] of WIDTHS) {
        it(`title above, legend in the footer at ${name} width`, async function titleFooter() {
          const { container } = await renderExampleAndWait(<ComposedTitleFooterExample />, width);

          assume(container.querySelector('svg')).exists();
          await expect(container).toMatchScreenshot(`composed-title-footer-${name}`);
        });

        it(`legend beside the title at ${name} width`, async function legendHeader() {
          const { container } = await renderExampleAndWait(<ComposedLegendHeaderExample />, width);

          assume(container.querySelector('svg')).exists();
          await expect(container).toMatchScreenshot(`composed-legend-header-${name}`);
        });
      }
    });

    describe('#responsive', function responsive() {
      for (const [name, width] of WIDTHS) {
        it(`default at ${name} width`, async function defaultByWidth() {
          const { container } = await renderExampleAndWait(<DefaultExample />, width);

          await expect(container).toMatchScreenshot(`default-${name}`);
        });
      }
    });

    describe('#rtl', function rtl() {
      it('default in RTL screenshot', async function defaultRtl() {
        const { container } = await renderExampleAndWait(
          <RTLProvider>
            <DefaultExample />
          </RTLProvider>
        );

        await expect(container).toMatchScreenshot('default-rtl');
      });

      it('composed legend beside the title in RTL screenshot', async function composedRtl() {
        const { container } = await renderExampleAndWait(
          <RTLProvider>
            <ComposedLegendHeaderExample />
          </RTLProvider>,
          375
        );

        await expect(container).toMatchScreenshot('composed-legend-header-rtl');
      });
    });
  });
});
