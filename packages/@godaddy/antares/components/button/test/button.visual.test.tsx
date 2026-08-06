import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { GhostExample } from '../examples/ghost.tsx';
import { InlineExample } from '../examples/inline.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Button', function buttonVisualTests() {
    it('inline resting state', async function inlineRestingRender() {
      const { container } = await render(<InlineExample />);
      await expect(container).toMatchScreenshot('inline-resting');
    });

    it('ghost', async function ghostRender() {
      const { container } = await render(<GhostExample />);
      await expect(container).toMatchScreenshot('ghost');
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
  });
});
