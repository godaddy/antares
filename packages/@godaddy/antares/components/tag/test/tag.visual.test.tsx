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

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    set({
      alert: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <path d="M12 13.75a.75.75 0 0 0 .75-.75V9a.75.75 0 1 0-1.5 0v4a.75.75 0 0 0 .75.75z" />
            <path d="M21.371 16.48 14.478 4.417a2.854 2.854 0 0 0-4.956 0L2.629 16.48a2.853 2.853 0 0 0 2.478 4.27h13.787a2.854 2.854 0 0 0 2.477-4.27zm-1.307 2.095a1.34 1.34 0 0 1-1.17.675H5.107a1.352 1.352 0 0 1-1.175-2.025l6.893-12.063a1.354 1.354 0 0 1 2.35 0l6.893 12.063a1.339 1.339 0 0 1-.004 1.35z" />
            <path d="M12 15.25h-.005a1.128 1.128 0 1 0 .005 0z" />
          </g>
        </svg>
      ),
      checkmark: (
        <svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 18.25a.748.748 0 0 1-.53-.22l-5-5a.75.75 0 0 1 1.06-1.06L9 16.44 19.47 5.97a.75.75 0 0 1 1.06 1.06l-11 11a.748.748 0 0 1-.53.22z"
            fill="currentColor"
          />
        </svg>
      ),
      information: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor">
            <path d="M12 2.258a9.75 9.75 0 1 0 9.75 9.75A9.761 9.761 0 0 0 12 2.257zm0 18a8.25 8.25 0 1 1 8.25-8.25 8.26 8.26 0 0 1-8.25 8.25z" />
            <path d="M12 11.258a.75.75 0 0 0-.75.75v5a.75.75 0 1 0 1.5 0v-5a.75.75 0 0 0-.75-.75zm-.003-4.125a1.125 1.125 0 1 0 .003 0z" />
          </g>
        </svg>
      ),
      star: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            d="M11.9 1.95a.75.75 0 0 1 .68.433l2.631 5.639 5.907.937a.75.75 0 0 1 .418 1.266l-4.334 4.427 1.038 6.225a.75.75 0 0 1-1.103.78l-5.237-2.9-5.237 2.9a.75.75 0 0 1-1.104-.77l.944-6.235-4.245-4.433a.75.75 0 0 1 .424-1.26l5.907-.937 2.631-5.64a.75.75 0 0 1 .68-.432zm0 2.524L9.78 9.017a.75.75 0 0 1-.562.424l-4.885.775 3.509 3.665a.75.75 0 0 1 .2.631l-.772 5.094 4.267-2.362a.75.75 0 0 1 .726 0l4.242 2.348-.845-5.069a.75.75 0 0 1 .204-.648l3.584-3.662-4.866-.772a.75.75 0 0 1-.562-.424z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      ),
      diamond: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            d="M5.393 3.559A.75.75 0 0 1 6 3.25h12a.75.75 0 0 1 .607.309l4 5.5a.75.75 0 0 1-.041.933l-10 11.5a.75.75 0 0 1-1.132 0l-10-11.5a.75.75 0 0 1-.04-.933zm.375 2.036L3.473 8.75H6.88zM7.41 10.25H3.646l6.336 7.287zm6.607 7.287 6.336-7.287H16.59zm.98-7.287H9.002L12 18.746zm2.12-1.5h3.41l-2.295-3.155zm-.178-4h-3.454l2.336 3.167zm-2.367 4L12 5.263 9.427 8.75zm-6.395-.834 2.336-3.166H7.06z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      )
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
