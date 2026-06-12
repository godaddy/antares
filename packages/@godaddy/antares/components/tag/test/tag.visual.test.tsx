import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { set } from '#components/icon';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { HighContrastExample } from '../examples/high-contrast.tsx';
import { IconsExample } from '../examples/icons.tsx';
import { IndicatorExample } from '../examples/indicator.tsx';
import { InlineExample } from '../examples/inline.tsx';

const placeholderSvg = (
  <svg viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" />
  </svg>
);

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    set({
      alert: placeholderSvg,
      checkmark: placeholderSvg,
      information: placeholderSvg,
      star: placeholderSvg,
      diamond: placeholderSvg
    });
  });

  describe('#Tag', function tagTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('emphases example', async function emphasesRender() {
      const { container } = await render(<EmphasesExample />);
      await expect(container).toMatchScreenshot('emphases');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('high contrast example', async function highContrastRender() {
      const { container } = await render(<HighContrastExample />);
      await expect(container).toMatchScreenshot('high-contrast');
    });

    it('icons example', async function iconsRender() {
      const { container } = await render(<IconsExample />);
      await expect(container).toMatchScreenshot('icons');
    });

    it('indicator example', async function indicatorRender() {
      const { container } = await render(<IndicatorExample />);
      await expect(container).toMatchScreenshot('indicator');
    });

    it('inline example', async function inlineRender() {
      const { container } = await render(<InlineExample />);
      await expect(container).toMatchScreenshot('inline');
    });
  });
});
