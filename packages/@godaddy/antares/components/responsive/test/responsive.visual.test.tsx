import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';
import { FormExample } from '../examples/form.tsx';
import { ResponsiveSizeExample } from '../examples/responsive-size.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);
  // `page.viewport` persists across tests, so reset it for every one.
  beforeEach(async function resetViewport() {
    await page.viewport(320, 768);
  });

  describe('#Responsive', function responsiveTests() {
    it.each([
      ['mobile', 320],
      ['wide', 1200]
    ] as const)('intrinsic layout example (%s)', async function intrinsicLayout(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot(`intrinsic-layout-${name}`);
    });

    it.each([
      ['mobile', 320],
      ['wide', 1200]
    ] as const)('container query example (%s)', async function containerLayout(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<ContainerLayoutExample />);
      await expect(container).toMatchScreenshot(`container-layout-${name}`);
    });

    it.each([
      ['mobile', 320],
      ['below-64rem', 1023],
      ['64rem', 1024]
    ] as const)('viewport media query example (%s)', async function viewportLayout(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<ViewportLayoutExample />);
      await expect(container).toMatchScreenshot(`viewport-layout-${name}`);
    });

    it.each([
      ['mobile', 320],
      ['below-64rem', 1023],
      ['64rem', 1024]
    ] as const)('form example (%s)', async function form(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<FormExample />);
      await expect(container).toMatchScreenshot(`form-${name}`);
    });

    it.each([
      ['mobile', 320],
      ['below-80rem', 1279],
      ['80rem', 1280]
    ] as const)('responsive size example (%s)', async function responsiveSize(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<ResponsiveSizeExample />);
      await expect(container).toMatchScreenshot(`responsive-size-${name}`);
    });
  });
});
