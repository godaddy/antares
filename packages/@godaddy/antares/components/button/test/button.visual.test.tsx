import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CriticalExample } from '../examples/critical.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { IconExample } from '../examples/icon.tsx';
import { InlineExample } from '../examples/inline.tsx';
import { MinimalExample } from '../examples/minimal.tsx';
import { PrimaryExample } from '../examples/primary.tsx';
import { SecondaryExample } from '../examples/secondary.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { TertiaryExample } from '../examples/tertiary.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Button', function buttonVisualTests() {
    it('default variant', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('primary variant', async function primaryRender() {
      const { container } = await render(<PrimaryExample />);
      await expect(container).toMatchScreenshot('primary');
    });

    it('secondary variant', async function secondaryRender() {
      const { container } = await render(<SecondaryExample />);
      await expect(container).toMatchScreenshot('secondary');
    });

    it('tertiary variant', async function tertiaryRender() {
      const { container } = await render(<TertiaryExample />);
      await expect(container).toMatchScreenshot('tertiary');
    });

    it('critical variant', async function criticalRender() {
      const { container } = await render(<CriticalExample />);
      await expect(container).toMatchScreenshot('critical');
    });

    it('inline resting state', async function inlineRestingRender() {
      const { container } = await render(<InlineExample />);
      await expect(container).toMatchScreenshot('inline-resting');
    });

    it('inline hovered state', async function inlineHoveredRender() {
      const { container, getByRole } = await render(<InlineExample />);
      const button = getByRole('button');

      await userEvent.hover(button);
      await Promise.all(
        button
          .element()
          .getAnimations()
          .map((animation) => animation.finished)
      );
      await expect(container).toMatchScreenshot('inline-hovered');
    });

    it('minimal variant', async function minimalRender() {
      const { container } = await render(<MinimalExample />);
      await expect(container).toMatchScreenshot('minimal');
    });

    it('icon example', async function iconRender() {
      const { container } = await render(<IconExample />);
      await expect(container).toMatchScreenshot('icon');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('disabled variants', async function disabledRender() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });
  });
});
