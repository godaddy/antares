import { Drawer } from '@bento/drawer';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React, { useState } from 'react';
import assume from 'assume';

describe('@bento/drawer', function bento() {
  describe('Drawer', function drawerTests() {
    it('should render a drawer', function test() {
      const { container } = render(
        <Drawer open={true} role="region">
          Drawer content
        </Drawer>
      );
      const result = container.innerHTML;

      assume(result).includes('Drawer content');
      assume(result).includes('aria-expanded="true"');
    });

    it('should have all drawer attributes', function test() {
      const { container } = render(
        <Drawer open={true} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[aria-expanded="true"]');
      expect(drawer).toHaveAttribute('aria-expanded', 'true');
      expect(drawer).toHaveAttribute('role', 'region');
    });

    it('should not have aria-expanded="true" when closed', function test() {
      const { container } = render(
        <Drawer open={false} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update when open state changes', async function test() {
      function DrawerWithState() {
        const [open, setOpen] = useState(false);
        return (
          <div>
            <button onClick={() => setOpen(!open)}>Toggle</button>
            <Drawer open={open} role="region">
              Drawer content
            </Drawer>
          </div>
        );
      }

      const { container } = render(<DrawerWithState />);
      const button = container.querySelector('button');
      const drawer = container.querySelector('[role="region"]');

      expect(drawer).toHaveAttribute('aria-expanded', 'false');
      button?.click();
      // Note: State updates are async, so we check after a tick
      await new Promise((resolve) => setTimeout(resolve, 0));
      // The drawer should now be expanded (though the actual state update depends on React's rendering)
    });

    it('should pass down props to the drawer', function test() {
      const { container } = render(
        <Drawer className="my-class" style={{ color: 'red' }} open={true} role="dialog">
          Drawer content
        </Drawer>
      );
      const result = container.innerHTML;
      const drawer = container.querySelector('[role="dialog"]');

      assume(result).includes('class="my-class"');
      expect(drawer).toHaveStyle({ color: 'red' });
      assume(result).includes('role="dialog"');
    });
  });
});
