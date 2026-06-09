import { describe, it, beforeAll } from 'vitest';
import { createRef } from 'react';
import { render } from 'vitest-browser-react';
import assume from 'assume';
import { Icon, Tag } from '@godaddy/antares';
import { set } from '#components/icon';

const placeholderSvg = (
  <svg viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe('@godaddy/antares', function antares() {
  describe('#Tag', function tagTests() {
    beforeAll(function setupIcons() {
      set({
        alert: placeholderSvg,
        checkmark: placeholderSvg,
        information: placeholderSvg,
        star: placeholderSvg,
        diamond: placeholderSvg
      });
    });

    it('renders the text label', async function rendersLabel() {
      const { container } = await render(<Tag emphasis="success">Active</Tag>);
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag).is.not.equal(null);
      assume(tag.textContent).contains('Active');
    });

    it('reflects emphasis, size, and design via data attributes', async function dataAttributes() {
      const { container } = await render(
        <Tag emphasis="critical" size="lg" design="filled">
          Expired
        </Tag>
      );
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.getAttribute('data-emphasis')).equals('critical');
      assume(tag.getAttribute('data-size')).equals('lg');
      assume(tag.getAttribute('data-design')).equals('filled');
    });

    it('applies the default props when none are provided', async function defaults() {
      const { container } = await render(<Tag>Label</Tag>);
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.getAttribute('data-emphasis')).equals('passive');
      assume(tag.getAttribute('data-size')).equals('md');
      assume(tag.getAttribute('data-design')).equals('filled');
      assume(tag.hasAttribute('data-high-contrast')).equals(false);
      assume(tag.hasAttribute('data-indicator')).equals(false);
    });

    it('renders a leading icon passed as a child', async function leadingIcon() {
      const { container } = await render(
        <Tag emphasis="info">
          <Icon icon="information" aria-hidden="true" />
          Info
        </Tag>
      );
      const icon = container.querySelector('[data-icon="information"]') as HTMLElement;

      assume(icon).is.not.equal(null);
      assume(icon.getAttribute('aria-hidden')).equals('true');
    });

    it('renders an indicator and forces high contrast', async function indicator() {
      const { container } = await render(
        <Tag emphasis="success" indicator>
          3 new
        </Tag>
      );
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.hasAttribute('data-indicator')).equals(true);
      assume(tag.hasAttribute('data-high-contrast')).equals(true);
    });

    it('enables high contrast explicitly', async function highContrast() {
      const { container } = await render(<Tag highContrast>HC</Tag>);
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.hasAttribute('data-high-contrast')).equals(true);
    });

    it('forces high contrast for the inline design', async function inlineHighContrast() {
      const { container } = await render(<Tag design="inline">Inline</Tag>);
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.getAttribute('data-design')).equals('inline');
      assume(tag.hasAttribute('data-high-contrast')).equals(true);
    });

    it('renders no icon when none is provided as a child', async function noIcon() {
      const { container } = await render(<Tag>Plain</Tag>);

      assume(container.querySelector('[data-icon]')).equals(null);
    });

    it('renders children alongside the indicator', async function indicatorWithChild() {
      const { container } = await render(
        <Tag indicator>
          <Icon icon="information" aria-hidden="true" />
          Both
        </Tag>
      );
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.hasAttribute('data-indicator')).equals(true);
      assume(container.querySelector('[data-icon="information"]')).is.not.equal(null);
    });

    it('forwards ref to the underlying span', async function forwardsRef() {
      const ref = createRef<HTMLSpanElement>();
      await render(<Tag ref={ref}>Ref</Tag>);

      assume(ref.current).is.not.equal(null);
      assume(ref.current?.tagName).equals('SPAN');
    });

    it('merges className and forwards arbitrary props', async function passthrough() {
      const { container } = await render(
        <Tag className="custom" data-testid="tag-x">
          X
        </Tag>
      );
      const tag = container.querySelector('span[data-emphasis]') as HTMLElement;

      assume(tag.classList.contains('custom')).equals(true);
      assume(tag.getAttribute('data-testid')).equals('tag-x');
    });
  });
});
