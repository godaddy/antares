import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';
import { FormExample } from '../examples/form.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);
  // `page.viewport` persists across tests, so reset it for every one.
  beforeEach(async function resetViewport() {
    await page.viewport(320, 768);
  });

  describe('#Responsive', function responsiveTests() {
    it.each([
      ['mobile', 320],
      ['below-lg', 1023],
      ['lg', 1024]
    ] as const)('viewport layout example (%s)', async function viewportLayout(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<ViewportLayoutExample />);
      await expect(container).toMatchScreenshot(`viewport-layout-${name}`);
    });

    it.each([
      ['mobile', 320],
      ['below-lg', 1023],
      ['lg', 1024]
    ] as const)('form example (%s)', async function form(name, width) {
      await page.viewport(width, 768);
      const { container } = await render(<FormExample />);
      await expect(container).toMatchScreenshot(`form-${name}`);
    });

    it.each([
      ['narrow', 479],
      ['wide', 480]
    ] as const)('container layout example (%s)', async function containerLayout(name, width) {
      await page.viewport(640, 768);
      const { container } = await render(<ContainerLayoutExample width={width} />);
      await expect(container).toMatchScreenshot(`container-layout-${name}`);
    });
  });
});
