import { beforeEach, describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Icon, set, ondemand, parser } from '@godaddy/antares';
import assume from 'assume';
import { IconExample } from '../examples/icon.tsx';

/**
 * Renders the Icon component to a string with provided props for SSR testing
 *
 * @param args - Props to pass to the Icon component
 * @returns Rendered string representation of the Icon component
 */
function renderIconToString(args = {}) {
  // @ts-expect-error - icon is required but we test error cases
  return renderToString(<Icon {...args} />);
}

describe('@godaddy/uxcore', function uxcore() {
  beforeEach(function setup() {
    set({
      star: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      heart: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      arrow: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      )
    });
  });

  describe('#Icon', function iconTests() {
    it('throws error when no icon name is provided', function noIcon() {
      assume(renderIconToString).throws();
    });

    it('renders icon with placeholder when icon is not found', function notFound() {
      const result = renderIconToString({
        icon: 'unknown',
        children: (
          <svg>
            <text>Hello</text>
          </svg>
        )
      });

      assume(result).includes('data-icon="unknown"');
      assume(result).includes('<text>Hello</text>');
    });

    it('renders the default Example', function defaultExample() {
      const result = renderToString(<IconExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders a default svg element if icon is loading or not found', function defaultSvg() {
      const result = renderToString(<IconExample icon="unknown" />);
      expect(result).toMatchSnapshot();
    });

    it('renders icon with individual width and height props', function dimensions() {
      const result = renderIconToString({ icon: 'star', width: 32, height: 40 });

      assume(result).is.a('string');
      assume(result).includes('data-icon="star"');
      assume(result).includes('width="32"');
      assume(result).includes('height="40"');
    });

    it('renders icon with custom color', function customColor() {
      const result = renderIconToString({ icon: 'heart', color: 'red' });

      assume(result).includes('data-icon="heart"');
      assume(result).includes('fill="red"');
    });

    it('renders icon with default currentColor', function defaultColor() {
      const result = renderIconToString({ icon: 'star' });

      assume(result).includes('fill="currentColor"');
    });

    it('renders different icons correctly', function multiple() {
      const starResult = renderIconToString({ icon: 'star' });
      const heartResult = renderIconToString({ icon: 'heart' });

      assume(starResult).includes('data-icon="star"');
      assume(heartResult).includes('data-icon="heart"');
      assume(starResult).includes('M12 2l3.09 6.26L22 9.27'); // star path
      assume(heartResult).includes('M20.84 4.61a5.5 5.5 0 0 0-7.78 0'); // heart path
    });

    it('includes accessibility attributes', function accessibility() {
      const result = renderIconToString({ icon: 'star' });

      assume(result).includes('role="presentation"');
      assume(result).includes('focusable="false"');
    });

    it('handles className prop correctly', function className() {
      const result = renderIconToString({
        icon: 'star',
        className: 'custom-class'
      });

      assume(result).includes('class=');
      // The exact class structure depends on how Bento handles className
    });

    it('handles aria-label prop', function ariaLabel() {
      const result = renderIconToString({
        icon: 'star',
        'aria-label': 'Favorite'
      });

      assume(result).includes('aria-label="Favorite"');
    });
  });

  describe('#exports', function exports() {
    it('exports set function for synchronous icon loading', function setExport() {
      assume(set).is.a('function');

      // Test that we can use the exported set function
      set({
        'test-custom': (
          <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      });

      const result = renderIconToString({ icon: 'test-custom' });
      assume(result).includes('data-icon="test-custom"');
      assume(result).includes('viewBox="0 0 24 24"');
    });

    it('exports ondemand function for asynchronous icon loading', function ondemandExport() {
      assume(ondemand).is.a('function');

      // Test that we can register a custom loader
      const unregister = ondemand(async function testLoader(iconName) {
        if (iconName === 'async-test') {
          return (
            <svg viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" />
            </svg>
          );
        }
        return undefined;
      });

      assume(unregister).is.a('function');
      unregister();
    });

    it('exports parser function for SVG string parsing', function parserExport() {
      assume(parser).is.a('function');

      // Test that we can use a pre-parsed icon with set
      // (parser requires DOM API not available in SSR environment)
      const prebuiltIcon = (
        <svg viewBox="0 0 24 24">
          <path d="M3 3h18v18H3z" />
        </svg>
      );

      set({ 'parsed-test': prebuiltIcon });

      const result = renderIconToString({ icon: 'parsed-test' });
      assume(result).includes('data-icon="parsed-test"');
      assume(result).includes('viewBox="0 0 24 24"');
      assume(result).includes('d="M3 3h18v18H3z"');
    });
  });
});
