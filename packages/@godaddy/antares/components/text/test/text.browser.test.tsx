import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Text', function textTests() {
    it('renders extra classes', async function rendersExtraClasses() {
      const { container } = await render(<DefaultExample className="extra-classes" />);
      expect(container.outerHTML).toContain('extra-classes');
    });
  });
});
