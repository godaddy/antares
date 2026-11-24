import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Wizard', function wizardTests() {
    it('full-screen canonical composition', async function openWizard() {
      await render(<DefaultExample />);
      await userEvent.click(page.getByRole('button', { name: 'Start setup' }));
      const dialog = page.getByRole('dialog', { name: 'Setup' }).element();
      const overlay = dialog.parentElement?.parentElement;
      if (!overlay) throw new Error('Expected a full-screen overlay');
      await expect(overlay).toMatchScreenshot('full-screen');
    });
  });
});
