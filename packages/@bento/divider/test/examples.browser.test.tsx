import { render } from 'vitest-browser-react';
import { beforeEach, afterEach, describe, it, vi, expect } from 'vitest';
import assume from 'assume';
import { MergeClassName } from '../examples/merge-classname.tsx';
import { Default } from '../examples/default-divider.tsx';
import { VerticalStyleOverride } from '../examples/vertical-style-override.tsx';
import { VerticalDiv } from '../examples/vertical-div.tsx';

describe('@bento/divider examples', function bento() {
  describe('Divider', function dividerExample() {
    it('renders the default divider', async function defaultRenderTest() {
      const { container } = await render(<Default />);
      const result = container.innerHTML;

      assume(result).includes('aria-orientation="horizontal"');
      assume(result).match(/^<hr[^>]*>$/);

      const divider = container.querySelector('hr');

      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
      expect(divider).toHaveAttribute('class');
    });

    it('renders a vertical divider with style override', async function verticalStyleOverrideTest() {
      const { container } = await render(<VerticalStyleOverride />);
      const result = container.innerHTML;

      assume(result).includes('aria-orientation="vertical"');
      assume(result).match(/^<hr[^>]*>$/);

      const divider = container.querySelector('hr');

      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      expect(divider).toHaveAttribute('class');

      expect(divider).toHaveAttribute('style');
      expect(divider).toHaveStyle('height: 100px');
      expect(divider).toHaveAttribute('data-override', 'style');
    });

    it('renders a vertical divider in a div', async function verticalInDivTest() {
      const { container } = await render(<VerticalDiv />);

      const divider = container.querySelector('hr');

      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      expect(divider).toHaveStyle('height: 100px');
      expect(divider).toHaveAttribute('class');
    });

    it('renders a divider with merged className', async function mergeClassNameTest() {
      const { container } = await render(<MergeClassName />);
      const divider = container.querySelector('hr');

      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      expect(divider).toHaveStyle('height: 100px');
      expect(divider).toHaveClass('custom-divider-class');
      const classAttribute = divider?.getAttribute('class');
      expect(classAttribute).toMatch(/_divider_/);
    });
  });
});
