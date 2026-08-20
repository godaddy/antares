import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { CardExample } from '../examples/card.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeEach(resetHover);

  describe('#Pressable', function pressableTests() {
    it('circle and square', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('circle-and-square');
    });

    it('card', async function cardRender() {
      const { container } = await render(<CardExample />);
      await expect(container).toMatchScreenshot('card');
    });
  });
});
