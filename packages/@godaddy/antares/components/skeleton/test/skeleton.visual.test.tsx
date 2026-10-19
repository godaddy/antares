import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp } from 'vitest/browser';
import { AspectRatioExample } from '../examples/aspect-ratio.tsx';
import { CustomSizeExample } from '../examples/custom-size.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { MediaCardExample } from '../examples/media-card.tsx';
import { RoundingsExample } from '../examples/roundings.tsx';
import { SizesExample } from '../examples/sizes.tsx';

type CDPSession = { send: (method: string, params: unknown) => Promise<void> };

// The shimmer loops forever, so screenshots use reduced motion to capture a still frame.
function setReducedMotion(value: 'reduce' | 'no-preference') {
  const session = cdp() as unknown as CDPSession;
  return session.send('Emulation.setEmulatedMedia', {
    features: value === 'reduce' ? [{ name: 'prefers-reduced-motion', value }] : []
  });
}

describe('@godaddy/antares', function antares() {
  beforeAll(function reduceMotion() {
    return setReducedMotion('reduce');
  });

  afterAll(function restoreMotion() {
    return setReducedMotion('no-preference');
  });

  describe('#Skeleton', function skeletonVisualTests() {
    it('default', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('sizes', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('roundings', async function roundingsRender() {
      const { container } = await render(<RoundingsExample />);
      await expect(container).toMatchScreenshot('roundings');
    });

    it('custom size', async function customSizeRender() {
      const { container } = await render(<CustomSizeExample />);
      await expect(container).toMatchScreenshot('custom-size');
    });

    it('aspect ratio', async function aspectRatioRender() {
      const { container } = await render(<AspectRatioExample />);
      await expect(container).toMatchScreenshot('aspect-ratio');
    });

    it('media card', async function mediaCardRender() {
      const { container } = await render(<MediaCardExample />);
      await expect(container).toMatchScreenshot('media-card');
    });
  });
});
