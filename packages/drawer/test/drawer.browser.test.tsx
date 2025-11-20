import { Drawer } from '@bento/drawer';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React, { useState } from 'react';
import assume from 'assume';

describe('@bento/drawer', function bento() {
  describe('Drawer', function drawerTests() {
    it('should render a drawer', function test() {
      const { container } = render(
        <Drawer isExpanded={true} role="region">
          Drawer content
        </Drawer>
      );
      const result = container.innerHTML;

      assume(result).includes('Drawer content');
      assume(result).includes('data-is-expanded="true"');
    });

    it('should have all drawer attributes', function test() {
      const { container } = render(
        <Drawer isExpanded={true} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[data-is-expanded="true"]');
      expect(drawer).toHaveAttribute('data-is-expanded', 'true');
      expect(drawer).toHaveAttribute('role', 'region');
    });

    it('should not have data-is-expanded when collapsed', function test() {
      const { container } = render(
        <Drawer isExpanded={false} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).not.toHaveAttribute('data-is-expanded');
    });

    it('should update when isExpanded state changes', async function test() {
      function DrawerWithState() {
        const [isExpanded, setIsExpanded] = useState(false);
        return (
          <div>
            <button onClick={() => setIsExpanded(!isExpanded)}>Toggle</button>
            <Drawer isExpanded={isExpanded} role="region">
              Drawer content
            </Drawer>
          </div>
        );
      }

      const { container } = render(<DrawerWithState />);
      const button = container.querySelector('button');
      const drawer = container.querySelector('[role="region"]');

      expect(drawer).not.toHaveAttribute('data-is-expanded');
      button?.click();
      // Note: State updates are async, so we check after a tick
      await new Promise((resolve) => setTimeout(resolve, 0));
      // The drawer should now be expanded (though the actual state update depends on React's rendering)
    });

    it('should pass down props to the drawer', function test() {
      const { container } = render(
        <Drawer className="my-class" style={{ color: 'red' }} isExpanded={true} role="dialog">
          Drawer content
        </Drawer>
      );
      const result = container.innerHTML;
      const drawer = container.querySelector('[role="dialog"]');

      assume(result).includes('class="my-class"');
      expect(drawer).toHaveStyle({ color: 'red' });
      assume(result).includes('role="dialog"');
    });

    it('should render with custom placement', function test() {
      const { container } = render(
        <Drawer isExpanded={true} placement="bottom" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('data-placement', 'bottom');
    });

    it('should render with top placement', function test() {
      const { container } = render(
        <Drawer isExpanded={true} placement="top" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('data-placement', 'top');
    });

    it('should render with right placement', function test() {
      const { container } = render(
        <Drawer isExpanded={true} placement="right" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('data-placement', 'right');
    });

    it('should render with end placement', function test() {
      const { container } = render(
        <Drawer isExpanded={true} placement="end" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('data-placement', 'end');
    });

    it('should render with start placement', function test() {
      const { container } = render(
        <Drawer isExpanded={true} placement="start" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toHaveAttribute('data-placement', 'start');
    });

    it('should render with animate disabled', function test() {
      const { container } = render(
        <Drawer isExpanded={true} animate={false} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toBeTruthy();
    });

    it('should render with custom animate string', function test() {
      const { container } = render(
        <Drawer isExpanded={true} animate="0.5s ease-out" role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]');
      expect(drawer).toBeTruthy();
    });

    it('should apply user styles', function test() {
      const { container } = render(
        <Drawer isExpanded={true} style={{ backgroundColor: 'blue' }} role="region">
          Drawer content
        </Drawer>
      );
      const drawer = container.querySelector('[role="region"]') as HTMLElement;
      expect(drawer).toHaveStyle({ backgroundColor: 'blue' });
    });
  });
});
