import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Image', function imageVisualTests() {
    it('default', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });
  });
});
