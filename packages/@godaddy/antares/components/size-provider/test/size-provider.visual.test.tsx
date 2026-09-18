import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PilotExample } from '../examples/pilot.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SizeProvider', function sizeProviderTests() {
    it('shows the pilot size mappings', async function pilot() {
      await page.viewport(1200, 1600);
      const { container } = await render(<PilotExample />);
      await expect(container).toMatchScreenshot('pilot');
    });
  });
});
