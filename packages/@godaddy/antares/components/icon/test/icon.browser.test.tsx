import { IconExample } from '../examples/icon.tsx';
import { render } from 'vitest-browser-react';
import { Icon } from '@godaddy/antares';
import { type ReactElement, createRef } from 'react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  /**
   * Wait for icon loading completion using MutationObserver
   *
   * Uses MutationObserver to detect when the icon has finished loading from the CDN
   * and the DOM has been updated with the SVG content. Resolves immediately if
   * content already exists.
   *
   * @param container - DOM container to observe for icon loading
   * @returns Promise resolving when icon loading is complete
   *
   * @throws {Error} If icon loading times out after 5 seconds
   */
  async function wait(container: HTMLElement) {
    return new Promise<void>(function waitPromise(resolve, reject) {
      // Check if already loaded (has icon content and no loading state)
      if (container.innerHTML.includes('data-icon=') && !container.innerHTML.includes('data-loading="true"')) {
        resolve();
        return;
      }

      const timeout = setTimeout(function timeoutHandler() {
        observer.disconnect();
        reject(new Error('Icon loading timeout after 5 seconds'));
      }, 5000);

      const observer = new MutationObserver(function observerHandler() {
        // Resolve when icon is present and not loading
        if (container.innerHTML.includes('data-icon=') && !container.innerHTML.includes('data-loading="true"')) {
          clearTimeout(timeout);
          observer.disconnect();
          resolve();
          return;
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true
      });
    });
  }

  /**
   * Render a component and wait for icon loading completion
   *
   * Combines rendering with automatic waiting for icon loading. Convenience
   * function that renders a component and then waits for icon loading.
   *
   * @param component - React component to render
   * @returns Promise resolving to render result with container after icon loading
   *
   * @throws {Error} If icon loading times out after 5 seconds
   */
  async function renderAndWait(component: ReactElement) {
    const result = await render(component);
    await wait(result.container);
    return result;
  }

  describe('Examples', function icon() {
    it('renders IconExample with color prop', async function example() {
      const { container } = await renderAndWait(<IconExample color="blue" />);

      const result = container.innerHTML;

      // Should render the star icon from the example
      assume(result).includes('data-icon="star"');
      assume(result).includes('aria-label="Star icon"');

      // Should apply the color prop
      assume(result).includes('fill="blue"');
    });

    it('renders a placeholder element if icon is loading', async function placeholder() {
      const { container } = await render(<IconExample icon="unknown" />);

      assume(container.innerHTML).includes('<svg data-placeholder="true"');
    });
  });

  describe('#children', function children() {
    it('renders children', async function children() {
      const { container } = await render(
        <Icon icon="home">
          <span>Hello the placeholder</span>
        </Icon>
      );

      // Initially should show placeholder content
      assume(container.innerHTML).includes('Hello the placeholder');

      // Wait for icon to load and replace placeholder
      await wait(container);

      // After loading, placeholder should be replaced with the icon
      assume(container.innerHTML).includes('data-icon="home"');
      assume(container.innerHTML).includes('<svg');
      assume(container.innerHTML).does.not.include('Hello the placeholder');
    });
  });

  describe('#color', function colorProp() {
    it('applies custom color correctly', async function customColor() {
      const { container } = await renderAndWait(<Icon icon="star" color="red" />);

      assume(container.innerHTML).includes('fill="red"');
      assume(container.innerHTML).includes('data-icon="star"');
    });

    it('uses currentColor as default when no color specified', async function defaultColor() {
      const { container } = await renderAndWait(<Icon icon="star" />);

      assume(container.innerHTML).includes('fill="currentColor"');
    });

    it('accepts hex color values', async function hexColor() {
      const { container } = await renderAndWait(<Icon icon="star" color="#ff0000" />);

      assume(container.innerHTML).includes('fill="#ff0000"');
    });

    it('accepts rgb color values', async function rgbColor() {
      const { container } = await renderAndWait(<Icon icon="star" color="rgb(255, 0, 0)" />);

      assume(container.innerHTML).includes('fill="rgb(255, 0, 0)"');
    });
  });

  describe('#dimensions', function dimensionsProp() {
    it('applies width and height props', async function dimensions() {
      const { container } = await renderAndWait(<Icon icon="star" width={25} height={35} />);

      assume(container.innerHTML).includes('width="25"');
      assume(container.innerHTML).includes('height="35"');
    });
  });

  describe('#data-attributes', function bentoIntegration() {
    it('includes correct data attributes', async function dataAttributes() {
      const { container } = await renderAndWait(<Icon icon="star" />);

      assume(container.innerHTML).includes('data-icon="star"');
      assume(container.innerHTML).not.includes('data-color=');
    });

    it('includes data attributes when color is provided', async function dataAttributesWithColor() {
      const { container } = await renderAndWait(<Icon icon="star" color="red" />);

      assume(container.innerHTML).includes('data-color="red"');
    });
  });

  describe('#multiple icon loading', function multipleIconLoading() {
    it('handles multiple instances of same icon', async function sameIconMultiple() {
      const instance1 = await renderAndWait(<Icon icon="star" width={16} height={16} />);
      const instance2 = await renderAndWait(<Icon icon="star" width={24} height={24} />);
      const instance3 = await renderAndWait(<Icon icon="star" color="red" />);

      assume(instance1.container.innerHTML).includes('data-icon="star"');
      assume(instance1.container.innerHTML).includes('width="16"');

      assume(instance2.container.innerHTML).includes('data-icon="star"');
      assume(instance2.container.innerHTML).includes('width="24"');

      assume(instance3.container.innerHTML).includes('data-icon="star"');
      assume(instance3.container.innerHTML).includes('fill="red"');
    });
  });

  describe('#ref', function refForwarding() {
    //
    // Skip: @bento/icon needs to use `...args` pattern for ref forwarding.
    // Fix: Change `function Iconic(args)` to `function Iconic(...args)` in @bento/icon
    //
    it.skip('forwards ref to the underlying SVG element', async function forwardRef() {
      const ref = createRef<SVGSVGElement>();
      const { container } = await render(<Icon icon="star" ref={ref} />);

      await wait(container);

      assume(ref.current).is.not.equal(null);
      assume(ref.current?.tagName.toLowerCase()).equals('svg');
      assume(ref.current?.getAttribute('data-icon')).equals('star');
    });
  });
});
