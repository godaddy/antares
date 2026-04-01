import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { TextExample } from '../examples/text.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Text', function textTests() {
    it('renders extra classes', async function rendersExtraClasses() {
      const { container } = await render(<TextExample className="extra-classes" />);
      expect(container.outerHTML).toContain('extra-classes');
    });
  });
});
